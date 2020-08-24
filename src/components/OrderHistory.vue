<template>
    <div >
        <h4>Order history </h4>
        <table >
            <tr >    
                <th>OrderID</th>
                <th>Recipient Name</th>
                <th>Order Date</th>
                <th>Gift Card Value (INR)</th>
                <th>Comission (10%)</th>
                <th>Delivery status </th>
                <th v-if="usertype=='admin'">Action </th>
            </tr>
            <tr v-for="(order, index) in orders" v-bind:key="index" >
                <td>
                    {{order.id}}
                </td>
                <td>
                    {{FullName[index]}}
                </td>
                <td>
                    {{OrderDate[index]}}
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
                <td v-if="usertype=='admin'">
                    <button v-if="usertype=='admin' && order.status!='Delivered'" v-on:click="UpdateStatus(order.id)" class="buttongreen" > Update
                    </button>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'User',

    data: function(){
        return {
            msg:"Order",
            userid: '',
            usertype:'',
            status:'',
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
        searchOrders: function(){
            return this.orders.filter((order)=>{
                return order.status.match(this.status)
            })
        },

        OrderDate: function()
        {
            return this.orders.map(function(item) {
                if(item.orderdate != '')
                {
                    return moment(String(item.orderdate)).format('MM/DD/YYYY hh:mm a') 
                }
                else
                {
                    return ''
                }
            });        
        },

        UnDeliveredGC: function(){
            return this.orders.filter((order)=>{
                return order.status.match(this.status)
            })
        }
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
            //get undelivered orders
            url = 'http://localhost:3000/order?status_ne=Delivered' 
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