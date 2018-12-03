import Vue from 'vue'
import Router from 'vue-router'
import HelloContainer from "./components/HelloWorld.vue"
import home from "./components/home.vue"
import login from "./components/login.vue"
import phonelogin from "./components/phonelogin.vue"
import regist from "./components/regist.vue"
import shopcart from "./components/shopcart.vue"

Vue.use(Router)

export default new Router({
  routes: [
    {path:'/',component:HelloContainer},
    {path:'/home',component:home},
    {path:'/home/login',component:login},
    {path:'/home/phonelogin',component:phonelogin},
    {path:'/home/regist',component:regist},
    {path:'/home/shopcart',component:shopcart}
  ]
})
