<template>
    <div class="form-container">
        <h4>Login</h4>
        <form @submit.prevent="validateSubmit">
            <div class="form-main">
                <div class="form-row">
                    <label for="username" >User Name</label>
                    <input type="text" v-model="login.username" v-validate="'required|alpha_num'"  name="username" :class="{'input': true, 'is-danger': errors.has('username') }" />
                </div>
                <div v-if="errors.has('username')" class="form-row">
                    <span v-show="errors.has('username')" class="help is-danger">{{ errors.first('username') }}</span>
                </div>

                <div class="form-row">
                    <label for="password" >Password</label>
                    <input type="password" v-model="login.password" v-validate="'required|alpha_num'"  name="password" :class="{'input': true, 'is-danger': errors.has('password') }" />
                </div>
                <div v-if="errors.has('password')" class="form-row form-span ">
                    <span v-show="errors.has('password')" class="help is-danger">{{ errors.first('password') }}</span>
                </div>

                <div class="form-row">
                    <button>Login</button>
                    <button v-on:click="Register"> Register </button>
                </div>
            </div>
        </form>
    </div>
</template>


<script>

export default {
  components: {
  },
    data:function () {
        return {
            msg:"Login",
            login:{
                username: '',
                password: '',
            }
        }
    },
    created:function()
    {
        //Clear all data from sessionStorage when login page is displayed
        sessionStorage.clear()
        // set the state layout value to default layout
        this.$store.commit('SET_LAYOUT', 'default-layout')
    },

    methods:
    {
        userLogin: function(){
            this.$http.get('http://localhost:3000/login?username=' + this.login.username)
            .then (response => {
                console.log(response)
                if(response.data.length > 0)
                {
                    if(response.data[0].password == this.login.password) 
                    {
                        this.userType = response.data[0].usertype
                        sessionStorage.usertype =  response.data[0].usertype;
                        sessionStorage.userid =  response.data[0].id;

                        //set store for layout
                        if (response.data[0].usertype === 'admin')
                        {
                            this.$store.commit('SET_LAYOUT', 'admin-layout')
                            // this.$store.dispatch('setLayout', 'admin-layout')
                        }
                        else
                        {
                            this.$store.commit('SET_LAYOUT', 'user-layout')
                            // this.$store.dispatch('setLayout', 'user-layout')
                        }
                        this.$router.push({path:'/orders'})                        
                    }
                    else {
                        this.$alert("Username and/or password invalid.");
                        // alert('UserName and/or password invalid')
                    }
                }
                else {

                    this.$alert("Username and/or password invalid.");
                    // alert('UserName and/or password invalid')
                }
            }, err => {
                console.log(err)
            })
        },
        Register()
        {
            this.$router.push( {path:'/register'})
        },

        validateSubmit()
        {
            this.submitted = true;
            this.$validator.validateAll().then(valid => {
            if (valid) {
                this.userLogin();
            }
            });
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  @import '../assets/style.css';
</style>
