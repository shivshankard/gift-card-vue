<template>
    <div class="form-container">
        <h4>Register User</h4>
        <form @submit.prevent="validateSubmit">
            <div class="form-main">
                <div class="form-row">
                    <label for="firstName" >First Name</label>
                    <input type="text" v-model="user.firstName" v-validate="'required|max:30'"  name="firstName" :class="{'input': true, 'is-danger': errors.has('firstName') }" />
                </div>
                <div v-if="errors.has('firstName')" class="form-row form-span">
                    <span v-show="errors.has('firstName')" class="help is-danger">{{ errors.first('firstName') }}</span>
                </div>
                <div class="form-row">
                    <label for="lastName" >Last Name</label>
                    <input type="text" v-model="user.lastName" v-validate="'required|max:30'"  name="lastName" :class="{'input': true, 'is-danger': errors.has('lastName') }" />
                </div>
                <div v-if="errors.has('lastName')" class="form-row form-span">
                    <span v-show="errors.has('lastName')" class="help is-danger">{{ errors.first('lastName') }}</span>
                </div>
                <div class="form-row">
                    <label for="username" >Username</label>
                    <input type="text" v-model="user.username" v-validate="'required|min:4|max:15'"  name="username" :class="{'input': true, 'is-danger': errors.has('username') }" />
                </div>
                <div v-if="errors.has('username')" class="form-row form-span">
                    <span v-show="errors.has('username')" class="help is-danger">{{ errors.first('username') }}</span>
                </div>
                <div class="form-row">
                    <label htmlFor="password" >Password</label>
                    <input type="password" v-model="user.password" v-validate="'required|min:4|max:20'"  name="password" :class="{'input': true, 'is-danger': errors.has('password') }" ref="user.password" />
                </div>
                <div v-if="errors.has('password')" class="form-row form-span">
                    <span v-show="errors.has('password')" class="help is-danger">{{ errors.first('password') }}</span>
                </div>
                <!-- <div class="form-row">
                    <label htmlFor="password" >Conform Password</label>
                    <input type="password" data-vv-as="user.password" v-validate="'required|confirmed:password|alpha_num|min:4|max:20'"  name="password_confirmation" :class="{'input': true, 'is-danger': errors.has('password_confirmation') }" />
                </div>
                <div v-if="errors.has('password_confirmation')" class="form-row">
                    <label ></label>
                    <span v-show="errors.has('password_confirmation')" class="help is-danger">{{ errors.first('password_confirmation') }}</span>
                </div> -->
                <div class="form-row">
                    <label htmlFor="Email" >Email</label>
                    <input type="text" v-model="user.email" v-validate="'required|email'"  name="email" :class="{'input': true, 'is-danger': errors.has('email') }" />
                </div>
                <div v-if="errors.has('email')" class="form-row form-span">
                    <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
                </div>
                <div class="form-row">
                    <button >Register</button>
                    <button v-on:click="Cancel"> Cancel </button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import moment from 'moment'

export default {
    data:function() {
        return {
            msg: "Register",
            user: {
                firstName: '',
                lastName: '',
                username: '',
                password: '',
                email: '',
                usertype:'user',
                registerdate: moment(String(new Date())).format('MM/DD/YYYY hh:mm a') 
            },
            submitted: false
        }
    },

    methods: {
        registerUser: function(){
            // check if username already used
            this.$http.get('http://localhost:3000/login?username=' + this.user.username)
            .then (response => {
                console.log(response)
                if(response.data.length > 0)
                {
                    if(response.data[0].username == this.user.username) 
                    {
                        //stay at register page
                        this.$alert("Username already exists!!!");
                    }
                    else
                    {
                        // add new user details
                        this.addUser();
                    }
                }
                else
                {
                    // add new user details
                    this.addUser();
                }
            }, err => {
                console.log(err)
            })
        },

        addUser:function(){
            this.$http.post('http://localhost:3000/login', this.user)
            .then (response => {
                console.log(response.status)
                if(response.status == '201')
                {
                    this.$alert("User registered sucessfully, please login to continue!!!");
                    this.$router.push( {path:'/'})
                }
            }, err => {
                console.log(err)
            })
        },

       async validateSubmit() {
            this.submitted = true;
            await this.$validator.validateAll().then(valid => {
                if (valid) {
                    this.registerUser();
                }
            });
        },

        Cancel: function()
        {
            this.$router.push( {path:'/'})                        
        }
    }
};
</script>

<style>
  @import '../assets/style.css';
</style>
