<template>
  <div class="text-xs-left">

    <v-col cols="auto">
      <v-btn size="large" color="green" @click="openDialog">
        Create a user
      </v-btn>

    </v-col>
    <v-dialog v-model="dialogVisible" max-width="1000px" transition="dialog-bottom-transition">
      <v-card>
        <v-form ref="checkTable">
          <v-card-title>
            <span class="headline">Create a user</span>
          </v-card-title>

          <v-card-text>
            <p>First Name</p>
            <v-text-field v-model="firstName" :rules="firstNameRules" clearable label="First Name" placeholder="John"
              type="String"></v-text-field>
          </v-card-text>

          <v-card-text>
            <p>Last Name</p>
            <v-text-field v-model="lastName" :rules="lastNameRules" clearable label="Last Name" placeholder="Doe"
              type="String"></v-text-field>
          </v-card-text>

          <v-card-text>
            <p>Email</p>
            <v-text-field v-model="emailAddress" :rules="emailRules" clearable label="Email address"
              placeholder="johndoe@gmail.com" type="email"></v-text-field>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="submitUser();" variant="elevated">Save</v-btn>
            <v-btn color="primary" text @click="closeDialog">Cancel</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>
  
<script>
export default {

  data() {
    return {
      dialogVisible: false,
      firstName: "",
      lastName: "",
      emailAddress: "",
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
    openDialog() {
      this.dialogVisible = true;
    },
    closeDialog() {
      this.dialogVisible = false;
    },

    async submitUser() {

      const validName = await this.$refs.checkTable.validate();
      console.log (validName);

      if (validName.valid) {

        try {
          const response = await fetch("http://localhost:3000/route1/new", {
            method: "PUT",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ firstname: this.firstName, lastname: this.lastName, email: this.emailAddress }),
          })
          this.closeDialog();
          if (response.ok)
            window.location.reload();


        } catch (error) {
          console.log(error)
        }
      } else {
        console.log("invalid input")
      }


    }
  },
};
</script>



