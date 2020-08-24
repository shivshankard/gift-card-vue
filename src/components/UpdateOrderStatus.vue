<template>
    <div  class="form-container">
        <h4>Update Order Status</h4>
        <form @submit.prevent="validateSubmit" >
            <div class="form-main">
                <div class="form-row">
                    <label for="firstName" >First Name</label>
                    <input type="text" disabled v-model="order.firstName" name="firstName" :class="{'input': true}" />
                </div>
                    <div class="form-row">
                    <label for="lastName" >Last Name</label>
                    <input type="text" disabled v-model="order.lastName" name="lastName" :class="{'input': true}"/>
                </div>
                <div class="form-row">
                    <label for="gcvalue" >Gift card value (INR)</label>
                    <input type="text" disabled v-model.number="order.gcvalue" name="gcvalue" :class="{'input': true}" />
                </div>
                <div class="form-row">
                    <label >Payable amount (10% commision)</label>
                    <input type="text" disabled name="commission" :value="TotalGCValue" :class="{'input': true}"  />
                </div>
                <div class="form-row">
                    <label for="phone" >Phone Number </label>
                    <input type="text" disabled v-model="order.phone" v-validate="'required|alpha_num|digits:10'"  name="phone" :class="{'input': true}" />
                </div>
                <div class="form-row">
                    <label for="address" >Address</label>
                    <input type="text" disabled v-model="order.address" v-validate="'required|alpha_num|min:5|max:50'"  name="address" :class="{'input': true, }" />
                </div>
                <div class="form-row" >
                    <label for="status" >Status</label>
                    <select v-model="order.status">
                        <option disabled value="">Please select one</option>
                        <option v-for="(item, index) in orderstatus" v-bind:key="index">{{item.status}}</option>
                    </select>
                </div>

                <div class="form-row">
                    <button >Update Order</button>
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
            msg: "Order",
            userid:'',
            usertype:'',
            firstName:'',
            lastName: "",
            totalGCValue:'0',
            order_id:'',
            login:{},
            orderstatus:{},
            order: {
                "id": '',
                "userid": this.userid,
                "firstName": "",
                "lastName": "",
                "orderdate" : '',
                "gcvalue" : "",
                "status" : "",
                "phone" : "",
                "address" : "",
                "lastupdateddate" : '', 
            },
            submitted: false
        }
    },
        computed:{
        TotalGCValue:function()
        {
            var totalpay = parseInt(this.order.gcvalue) + parseInt(this.order.gcvalue) * .1
            if (isNaN(totalpay))
            {
                totalpay = 0
            }
           return totalpay
        }
    },

    created:function()
    {
        if(sessionStorage)
        {
            this.userid = sessionStorage.userid;
            this.usertype = sessionStorage.usertype;
            this.order_id = sessionStorage.orderid;
            console.log(this.usertype)
        }

        // check order details for existing order update
        if(this.order_id !='' )
        {
            this.$http.get('http://localhost:3000/order/' + this.order_id)
            .then (resp => {
                console.log(resp)
                this.order = resp.data
                this.order.lastupdateddate = moment(String(new Date())).format('MM/DD/YYYY hh:mm a') 
            }, err => {
                console.log(err)
            })
        }

        this.$http.get('http://localhost:3000/orderstatus/')
        .then (respStatus => {
            console.log(respStatus)
            this.orderstatus = respStatus.data
        }, err => {
            console.log(err)
        })
    },

    methods: {
        validateSubmit() {
            this.submitted = true;
            console.log(this.order)
            this.$validator.validateAll().then(valid => {
                if (valid) {
                    this.$http.put('http://localhost:3000/order/' + this.order.id, this.order)
                    .then (response => {
                        console.log(response)
                        //remove order_id and order action from sessionStorage
                        if(response.status == '200'){
                            this.$router.push({path:'/orders'})                        
                            sessionStorage.removeItem('orderid');
                        }
                    }, err => {
                        console.log(err)
                    })
                }
            });
        },
        Cancel: function()
        {
            this.$router.push( {path:'/orders'})                        
        }
    },

};
</script>
<style>
  @import '../assets/style.css';
</style>
