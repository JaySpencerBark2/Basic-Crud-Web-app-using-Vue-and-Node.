const mongoose = require ('mongoose');
const userInfo = require('./models/model');
const userName = require('./models/users');




// const Input = new userInfo({
//     firstname: 'jay123134',
//     lastname:  'test123112321312',
//     email: 'test@gmail.com',
// });


// const userCreate = new userName({
//     username: 'root',
//     password: 'root'
// });


module.exports = {

    //create the new users  and checks if it exist or not. 
    async  inputUser(Fname, Lname, Address){

        const Input = new userInfo({
            firstname: Fname,
            lastname:  Lname,
            email: Address,
        });

        const userExist = await userInfo.findOne({firstname: Input.firstname, email: Input.email, lastname: Input.lastname});
            if(userExist)
                return console.log("User already exisit!");
                
            else
                await Input.save();
                console.log('User has been saved to the DB!');
    },

    async  collectTable(){
        const Output = await userInfo.find({}); 
        //console.log(Output);
        return Output;
    },

    async deleteEntrie(id){
        const objID = new mongoose.Types.ObjectId(id);
        const deleteID = await userInfo.findById(objID)
        if(!deleteID)
            console.log("Can not find ID")
        else
           await userInfo.findByIdAndDelete(objID);
           console.log("request hs been deleted")

    },

    async updateEntrie(item){
        const updaetUsers = await userInfo.findOneAndUpdate(item);
        if(!updaetUsers)
            console.log("cant updaet this user")
        else
            console.log("user updated.")
    }

}
