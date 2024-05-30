<template>
    <div class="d-flex align-center justify-center" style="height: 100vh">
    
        <v-sheet width="400" class="mx-auto">
            <h1>Please create an Account</h1>
            <v-form fast-fail @submit.prevent="register">
                <v-text-field v-model="username" label="User Name"></v-text-field>

                <v-text-field v-model="password" label="password"></v-text-field>

                <v-btn type="submit" color="primary" block class="mt-2">Sign up</v-btn>

            </v-form>
        </v-sheet>
    </div>
</template>
<script>
export default {
    data() {
        return {
            username: '',
            password: '',
        };
    },
    methods: {
        register() {
            
        },
    },
}
</script>