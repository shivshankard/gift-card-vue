<template>
    <navbar>
        <ul class="ul">
            <li >
                <router-link to="/giftcard" >New Order</router-link>
            </li>
            <li >
                <router-link to="/orders" >Order History</router-link>
            </li>
            <!-- <li >
                <router-link to="/report" >Order Report</router-link>
            </li>
            <li>
                <router-link to="/users" >Registered users</router-link>
            </li> -->
        </ul>
        <ul class="logout">
            <li >
                <router-link to="/" exact >Logout</router-link>
            </li>
        </ul>
    </navbar>
</template>

<script>
export default {

    data: function(){
        return {
            msg:"Order",
            usertype: '',
        }
    },
    created:function()
    {
        // alert('From header created')
    },
}
</script>
