<template>
    <v-dialog v-model="dialog" max-width="1000px" transition="dialog-bottom-transition">
        <v-card>
          <v-form ref="updateTable">
            <v-card-title>
              <span class="headline">Update a User</span>
            </v-card-title>
            <v-card-text>
              <p>First Name</p>
              <v-text-field v-model="firstName"
                :rules="firstNameRules"
               :placeholder="firstName" 
               placeholder="First Name" 
              clearable label="First Name" 
               ype="string"></v-text-field>
            </v-card-text>
            <v-card-text>
              <p>Last Name</p>
              <v-text-field v-model="lastName" 
              :rules="lastNameRules"
              placeholder="last Name" 
              clearable label="Last name" 
              type="string">
            </v-text-field>
            </v-card-text>
            <v-card-text>
              <p>Email</p>
              <v-text-field 
              v-model="emailAddress" 
              :rules="emailRules"
              placeholder="email address" 
              clearable label="Email address" 
              type="email"></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="updateTable()" variant="elevated">Save</v-btn>
              <v-btn color="primary" text @click="closePopup()">Cancel</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      firstName: '',
      lastName: '',
      emailAddress: '',
      firstNameRules: [
        v => !!v || "First name is required"
      ],
      lastNameRules: [
        v => !!v || "Last name is required"
      ],
      emailRules: [
        v => !!v || "Email is required",
        v => /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'E-mail must be valid',
      ],
    };
  },
  methods: {
    openPopup(item) {
      this.firstName = item.firstname;
      this.lastName = item.lastname;
      this.emailAddress = item.email;
      this.dialog = true;
      
      console.log(item);
    },
   async closePopup() {
      this.dialog = false;
    },
  async  updateTable(){
    const validCheck = await this.$refs.updateTable.validate();
    console.log(validCheck);

    if(validCheck.valid){
      try{
            const response = await fetch("http://localhost:3000/route1/update", {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({firstname: this.firstName, lastname: this.lastName, email: this.emailAddress
                })
            })
            this.closePopup();
            if(response.ok)
              window.location.reload();
        }catch(error){
            console.log(error)
        }

    }else{
      console.log("invalid Input")
    }
    }
  }
};
</script>