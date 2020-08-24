<template>
    <div class="form-container">
        <h4>New Gift Card Order</h4>
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
                    <input type="text" v-model.number="order.gcvalue" v-validate="'required|numeric|min:3|max:5'"  name="gcvalue" :class="{'input': true, 'is-danger': errors.has('gcvalue') }" />
                </div>
                <div v-if="errors.has('gcvalue')" class="form-row form-span">
                    <span v-show="errors.has('gcvalue')" class="help is-danger">{{ errors.first('gcvalue') }}</span>
                </div>
                <div class="form-row">
                    <label >Payable amount (10% commision)</label>
                    <input type="text" disabled name="commission" :value="TotalGCValue" :class="{'input': true}"  />
                </div>
                <div class="form-row">
                    <label for="phone" >Phone Number </label>
                    <input type="text" v-model="order.phone" v-validate="'required|numeric|digits:10'"  name="phone" :class="{'input': true, 'is-danger': errors.has('phone') }" />
                </div>
                <div v-if="errors.has('phone')" class="form-row form-span">
                    <span v-show="errors.has('phone')" class="help is-danger">{{ errors.first('phone') }}</span>
                </div>
                <div class="form-row">
                    <label for="address" >Address</label>
                    <input type="text" v-model="order.address" v-validate="'required|min:5|max:50'"  name="address" :class="{'input': true, 'is-danger': errors.has('address') }" />
                </div>
                <div v-if="errors.has('address')" class="form-row form-span">
                    <span v-show="errors.has('address')" class="help is-danger">{{ errors.first('address') }}</span>
                </div>
                <div class="form-row">
                    <button >Place Order</button>
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
            lastName:'',
            totalGCValue:'0',
            login:{},
            giftcardvalue:{},
            order: {
                "userid": '',
                "firstName": "",
                "lastName": "",
                "orderdate" : moment(String(new Date())).format('MM/DD/YYYY hh:mm a') ,
                "gcvalue" : "",
                "status" : "New Order",
                "phone" : "",
                "address" : "",
                "lastupdateddate" : moment(String(new Date())).format('MM/DD/YYYY hh:mm a') 
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
        }

        console.log(this.userid)
        this.$http.get('http://localhost:3000/login?id=' + this.userid)
        .then (response => {
            console.log(response)
            this.login = response.data[0]
            this.order.firstName = this.login.firstName
            this.order.lastName = this.login.lastName
            this.order.userid = this.login.id
        }, err => {
            console.log(err)
        })

        this.$http.get('http://localhost:3000/gcardvalue/')
        .then (respStatus => {
            console.log(respStatus)
            this.giftcardvalue = respStatus.data
        }, err => {
            console.log(err)
        })

    },

    methods: {
        validateSubmit() {
            this.submitted = true;
            this.$validator.validateAll().then(valid => {
                if (valid) {
                    this.$http.post('http://localhost:3000/order', this.order)
                    .then (response => {
                        console.log(response)
                        this.$router.push( {name:'orderhistory'})
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