<template>
    <body>
      <div>
        <admin-header></admin-header> 
      </div>
      <main>
        <article>
          <router-view></router-view>
        </article>
        <nav></nav>
        <aside></aside>
      </main>
      <footer>
        <app-footer></app-footer>
      </footer>
    </body>
</template>

<script>

import footer from '../components/Footer.vue'
import adminheader from '../components/AdminHeader.vue'

export default {
  name: 'App',
  components: {
    'app-footer':footer,
    'admin-header': adminheader,
  },
    data: function(){
        return {
            msg:"Order",
            usertype: '',
        }
    },
    mounted:function()
    {
        if(sessionStorage)
        {
            this.usertype = sessionStorage.usertype;
        }
    },
}
</script>

<style>
  @import '../assets/style.css';
</style>
