import RegisterUser from "../components/RegisterUser.vue";
import LoginUser from "../components/Login.vue";
import OrderHistory from "../components/OrderHistory.vue"
import OrderGC from "../components/NewOrder.vue"
import UpdateOrderStatus from "../components/UpdateOrderStatus.vue"
import OrderReport from "../components/Report.vue"
import RegisteredUsers from "../components/RegisteredUsers.vue"

export default [
    {
        path:'/',
        component:LoginUser,
    },
    {
        path:'/register',
        component:RegisterUser,
    },
    {
        path:'/orders',
        name:'orderhistory',
        component:OrderHistory,
        meta: {
            requireAuth: true,
        }
    },
    {
        path:'/report',
        name:'Orderreport',
        component:OrderReport,
        meta: {
            requireAuth: true,
        }
    },
    {
        path:'/giftcard',
        name:'Giftcard',
        component:OrderGC,
        meta: {
            requireAuth: true,
        }
    },
    {
        path:'/updateorder',
        name:'Updateorder',
        component:UpdateOrderStatus,
        meta: {
            requireAuth: true,
        }
    },
    {
        path:'/users',
        name:'Users',
        component:RegisteredUsers,
        meta: {
            requireAuth: true,
        }
    },
]