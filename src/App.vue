<template>
   <div id="app">
      <img src="./assets/logo.png" alt="">
      <div id="nav">
         <router-link to="/">Home</router-link>
         |
         <router-link to="/about">About</router-link>
      </div>
      <router-view/>
      <div>
         <p>
            If Element is successfully added to this project, you'll see an
            <code v-text="'<el-button>'"></code>
            below
         </p>
         <el-button @click=goToAbout>{{ text }}</el-button>
         <el-button @click=increment>inc</el-button>
      </div>
   </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import router from "@/router";

export default {
   name: 'app',
   components: {
      HelloWorld
   },
   data() {
      return {
         text: "to about"
      }
   },
   methods: {
      goToAbout() {
         console.log("go?")
         if (this.$router.currentRoute.path !== "/about") {
            router.push("/about")
            this.text = "to main"
         } else {
            this.text = "to about"
            router.push("/")
         }
      },
      increment() {
         this.$store.commit('increment')
         console.log(this.$store.state.count)
      }
   },
   computed: {
      count() {
         return store.state.count
      }
   }
}
</script>

<style>
#app {
   font-family: 'Avenir', Helvetica, Arial, sans-serif;
   -webkit-font-smoothing: antialiased;
   -moz-osx-font-smoothing: grayscale;
   text-align: center;
   color: #2c3e50;
   margin-top: 60px;
}
</style>
