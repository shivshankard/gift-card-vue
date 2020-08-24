import Vue from 'vue'
import App from './App.vue'
import VueResource from "vue-resource"; 
import VeeValidate from 'vee-validate';
import giftcardRoutes from "./routes/route";
import VueRouter from "vue-router";
import "@blexar/framework";
import VueSimpleAlert from "vue-simple-alert";
import Vuex from 'vuex'
import { store } from './store'

Vue.use(Vuex)
Vue.config.productionTip = false
Vue.use(VueResource)
Vue.use(VeeValidate);
Vue.use(VueRouter)
Vue.use(VueSimpleAlert);

const userroute = new VueRouter({
  routes:giftcardRoutes,
  mode:'history',
  
})

userroute.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    let storage = sessionStorage
    if (storage.getItem('userid') != null) {
      if(to.name === 'Updateorder' || to.name === 'Orderreport' || to.name === 'Users') 
      {
        if( storage.getItem('usertype') === 'admin')
        {
          next()
        }
        else{
          alert('You are not authorised to view selected feature!!!')
          next({path: '/'})
        }
      }
      else{
        next()
      }
    } else {
      alert('You are not authorised to view selected feature!!!')
      next({path: '/'})
    }
   }
   else {
   next()
   }
 })

new Vue({
  store,
  render: h => h(App),
  router:userroute
}).$mount('#app')
