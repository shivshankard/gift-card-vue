<template>
    <div >
        <h4>Registered users </h4>
        <table >
            <tr >    
                <th>User ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>User Name</th>
                <th>User Type</th>
                <th>Email</th>
                <th>User since </th>
            </tr>
            <tr v-for="(log, index) in login" v-bind:key="index" >
                <td>
                    {{log.id}}
                </td>
                <td>
                    {{log.firstName}}
                </td>
                <td>
                    {{log.lastName}}
                </td>
                <td>
                    {{log.username}}
                </td>
                <td>
                    {{log.usertype}}
                </td>
                <td>
                    {{log.email}}
                </td>
                <td >
                    {{log.registerdate}}
                </td>
            </tr>
        </table>
    </div>
</template>

<script>

export default {
  name: 'User',

    data: function(){
        return {
            msg:"Login",
            userid: '',
            usertype:'',
            login:{},
        }
    },

    created:function()
    {
        if(sessionStorage)
        {
            this.userid = sessionStorage.userid;
            this.usertype = sessionStorage.usertype;
        }

        this.$http.get('http://localhost:3000/login')
            .then (response => {
                console.log(response)
                this.login = response.data
            }, err => {
                alert(err)
                console.log(err)
        })
    },

  components:{

  }
}
</script>

<style>
  @import '../assets/style.css';
</style>