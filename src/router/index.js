import Vue from 'vue'
import VueRouter from 'vue-router'
import MainView from '../views/MainView.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: MainView,
    children:[
      // {
      //   path:"home",
      //   name:"home",
      //   component:()=>import("../views/home")
      // },
      // {
      //   path:"mall",
      //   name:"mall",
      //   component:()=>import("../views/mall")
      // },
      // {
      //   path:"user",
      //   name:"user",
      //   component:()=>import("../views/user")
      // },
      // {
      //   path:"page1",
      //   name:"page1",
      //   component:()=>import("../views/other/page1.vue")
      // },
      // {
      //   path:"page2",
      //   name:"page2",
      //   component:()=>import("../views/other/page2.vue")
      // }
    ]
  },
  {
    path:'/login',
    name:'login',
    component:()=>import('../views/login')
  }
  
]

//解决重复点击报错；vue3.0+ 当前路由跳当前路由会提示错误信息
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
