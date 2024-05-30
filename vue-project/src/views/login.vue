<template>
    <div class="d-flex align-center justify-center" style="height: 100vh">
        <v-sheet width="400" class="mx-auto">
            <v-form fast-fail @submit.prevent="login">
                <v-text-field v-model="userName" label="User Name"></v-text-field>

                <v-text-field v-model="passWord" label="password"></v-text-field>
                <v-btn type="submit" color="primary" block class="mt-2">Sign in</v-btn>
                
            </v-form>
            <div class="mt-2">
                <p class="text-body-2">Don't have an account? <a href="/register">Sign Up</a></p>
            </div>
        </v-sheet>
    </div>
</template>
<script>
export default {
    data() {
        return {
            userName: '',
            passWord: '',
        };
    },
    methods: {
        async login(){
            //window.location.href = "http://localhost:3000/login"
            try {
                const res = await fetch("http://localhost:3000/login/login", {
                method: "POST",
                credentials : 'include',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username: this.userName, password: this.passWord }),
                });
            if(res.ok){
                // alert('okay')
                window.location.href = '/tables'
            }
            else windows.location.href ="/login"
            console.log(res);
            } catch (error) {
                console.log(error);
            }   
        },
    },
}
</script>