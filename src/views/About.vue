<template>
  <div class="about">
    <h1>This is an about page</h1>
     <h2>{{count}}</h2>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
   name: 'About',
   components: {

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