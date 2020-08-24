<template>
    <body>
      <div >
        <app-header></app-header> 
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

import header from '../components/Header.vue'
import footer from '../components/Footer.vue'

export default {
  name: 'App',
  components: {
    'app-header':header,
    'app-footer':footer,
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
  @import '/assets/style.css';
</style>
