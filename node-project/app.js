const express = require ('express');
const mongoose = require ('mongoose');
const check = require('./check');
const url = require('url');
const passport = require('passport');
const LocalStrat = require('passport-local').Strategy;
const userVer = require('./models/users.js');
const session = require("express-session");
const user = require("./models/users");


var newConnectionUrl = "mongodb://127.0.0.1:27017/newCollection";


const app = express();
const PORT = 3000
// Add in CORS handler.

app.use(express.json());

app.use(session({
  secret: '1234567890',
  resave: false, 
  saveUninitialized : false, 
  cookie : {maxAge :  900000}
}));


app.use(passport.initialize());

app.use(passport.session());


//passport set ups with local mongoose

passport.use(new LocalStrat(user.authenticate()));

passport.serializeUser(user.serializeUser());

passport.deserializeUser(user.deserializeUser());


//creates a new user for db 

//  new Promise((resolve, reject) => {

//         user.register(new user({ username: 'test1' }), 'test123', function (err, newuser) {

//           console.log("Resolved.");

//           resolve();

//         });

//       });

app.use(async function (request, response, next) {

  console.log("Setting CORS");
  //Find the referrer or origin.

  let refer = url.parse(
    request.header("Referer") ||
      request.header("Origin") ||
      "http://localhost:80"
  );

  console.log("Referrer:", refer);

  //Add headers allowing the referrer.

  response.header(
    "Access-Control-Allow-Origin",
    refer.protocol +
      "//" +
      refer.hostname +
      (refer.port ? ":" + refer.port : "")
  );

  response.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );

  response.header(

    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, DELETE, PATCH"
  );

  response.header("Access-Control-Allow-Credentials", "true");

  //If an OPTIONS request has been sent, return status 200.

  if (request.method === "OPTIONS") {
    response.sendStatus(200);
  }
  //Not an OPTIONS request, pass through the rest of the stack.
  else {
    next();
  }

});

//old corse function 
// //Create CORS middleware
// var cors = require('cors')

// var corsOptions = {
//   origin: false,
//   // origin: ['http://localhost:8080/*','http://localhost:3000/*' ],
//   optionsSuccessStatus: 200,
//   credentials: true,
//   // "Allow-Origin" : true
// }



// app.use(cors(corsOptions));

const register = require('./routes/register');
app.use('/register', register);

app.use("/login", require("./routes/login.js"));

function authCheck(req, res,next){

  console.log("authcheck : user : ", req.user);
  console.log(req.session['testvar']);

  

  if(req.isAuthenticated() || req.path === "/login/login"){
    next();

  }else {
    res.status(401).send({message : "router not authenticated"})
  }
}

app.use(authCheck);




//const loginRoute = require("routes/login")
const routes1 = require ('./routes/routes1');
const routes2 = require ('./routes/routes2');
const bodyParser = require('body-parser');




app.listen(PORT, (error) =>{
	if(!error)
		console.log("Server is Successfully Running, and App is listening on port "+ PORT)
	else
		console.log("Error occurred, server can't start", error);
	}
);
 


//connects to the mongo db on docker.
mongoose.connect(newConnectionUrl).catch(error => handleError(error));


app.use('/route1', routes1)
app.use('/route2', routes2)



check.inputUser();
check.collectTable();




