<template>
   <div>
      <div>{{ post.name }}</div>
      <el-button @click="enlarge()">Enlarge Text</el-button>
   </div>
</template>

<script>
export default {
   name: "BlogPost",
   props: {
      // name: String,
      post: Object
   },
   data() {
      return {}
   },
   methods: {
      enlarge() {
         this.$emit('enlarge-text')
      }
   }
}
</script>

<style scoped>

</style>