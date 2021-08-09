import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
// import About from '../views/About'
import Scroll from '../views/Scroll'
import Test from "@/views/Test";
import TableIndent from '@/views/TableIndent'
import SelectDefault from '@/views/SelectDefault'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    // component: About
  },
  {
    path: '/scroll',
    name: 'scroll',
    component: Scroll
  },
  {
    path: '/test',
    name: 'test',
    component: Test
  },
  {
    path: '/table',
    name: 'table',
    component: TableIndent
  },
  {
    path: '/select',
    name: 'select',
    component: SelectDefault
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
