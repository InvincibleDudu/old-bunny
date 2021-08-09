<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
     <h2>{{count}}</h2>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
   data() {
      return {
         // count: 0
      }
   },
   computed: {
      count() {
         return this.$store.state.count
      }
   }
}
</script>
