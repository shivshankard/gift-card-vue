<template>
    <div >
        <h4>Order Report </h4>
        <table >
            <tr >    
                <th>OrderID</th>
                <th>Recipient Name</th>
                <th>Order Date</th>
                <th>Gift Card Value (INR)</th>
                <th>Comission (10%)</th>
                <th>Delivery status </th>
                <th >Last updated date </th>
            </tr>
            <tr v-for="(order, index) in orders" v-bind:key="index" >
                <td>
                    {{order.id}}
                </td>
                <td>
                    {{FullName[index]}}
                </td>
                <td>
                    {{order.orderdate}}
                </td>
                <td>
                    {{order.gcvalue}}
                </td>
                <td>
                    {{order.gcvalue * .1}}
                </td>
                <td>
                    {{order.status}}
                </td>
                <td >
                     {{order.lastupdateddate}}                        
                </td>
            </tr>
        </table>
        <div style="text-align:right; padding-top:5px">
            <strong > Total Comission : INR {{TotalComission}} </strong> 
        </div>
    </div>
</template>

<script>

export default {
  name: 'User',

    data: function(){
        return {
            msg:"Order",
            userid: '',
            usertype:'',
            login:{},
            orders:{}
        }
    },
    computed: {
        FullName: function () {
            return this.orders.map(function(item) {
                //get the firstname and lastname from login object and build the FullName                
                return item.firstName + ' ' + item.lastName;
            });        
        },

        // OrderDate: function()
        // {
        //     return this.orders.map(function(item) {
        //         if(item.orderdate != '')
        //         {
        //             return moment(String(item.orderdate)).format('MM/DD/YYYY hh:mm') 
        //         }
        //         else
        //         {
        //             return ''
        //         }
        //     });        
        // },

        TotalComission: function()
        {
            let totComission = 0
            for (let i = 0; i < this.orders.length; i++)
            {
                var comisson =  parseInt(this.orders[i].gcvalue) * .1 
                    if (isNaN(comisson))
                    {
                        comisson = 0
                    }
                totComission = totComission + comisson ;
            }
            return totComission
        },
        
    },    

    methods:{
        UpdateStatus: function(id){
            console.log(id)
            sessionStorage.orderid =  id;
            this.$router.push( {path:'/updateorder'})                        
        },
    },

    created:function()
    {
        if(sessionStorage)
        {
            this.userid = sessionStorage.userid;
            this.usertype = sessionStorage.usertype;
        }

        var url = ''
        if(this.usertype =='admin')
        {
            url = 'http://localhost:3000/order'
        }
        else
        {
            url = 'http://localhost:3000/order?userid=' + this.userid
        }

        this.$http.get(url)
            .then (response => {
                console.log(response)
                this.orders = response.data
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

