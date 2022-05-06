import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import http from 'axios'
import '../api/mock.js'


import './assets/less/index.less'
import * as echarts from 'echarts';

Vue.prototype.$echarts = echarts

Vue.use(ElementUI)
Vue.prototype.$http=http
Vue.config.productionTip = false

//导航守卫、路由守卫
router.beforeEach((to,from,next)=>{
  store.commit('getToken') //防止页面刷新vuex丢失token
  const token=store.state.user.token;
  if(!token&&to.name!=='login'){
    next({name:'login'})
  }else if(token&&to.name==='login'){
    next({name:'home'})
  }else{
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    store.commit('addMenu',router)
  }
}).$mount('#app')
