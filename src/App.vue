<template>
  <component v-bind:is="layout"></component>
</template>

<script>
import AdminLayout from './layouts/AdminLayout.vue'
import UserLayout from './layouts/UserLayout.vue'
import DefaultLayout from './layouts/DefaultLayout.vue'

export default {

  computed: {
    layout:function() {
      // below if condtions are to set correct header on page refresh manually
      if(sessionStorage.getItem('usertype') === 'admin') {
          this.$store.commit('SET_LAYOUT', 'admin-layout')
        }
        else if ( sessionStorage.getItem('usertype') === 'user'){
          this.$store.commit('SET_LAYOUT', 'user-layout')
        }
        else {
          this.$store.commit('SET_LAYOUT', 'default-layout')
        }
      return this.$store.state.layout
    }
  },
  components: {
    'admin-layout': AdminLayout,
    'user-layout': UserLayout,
    'default-layout': DefaultLayout
  },
}
</script>
