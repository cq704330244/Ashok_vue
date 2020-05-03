import Vue from 'vue'
import Router from 'vue-router'
import Login from '../view/login/Login'
import Home from '../view/home/index.vue'
import Notfound from '../view/notFound/index.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '*',
      name: '404notFound',
      component: Notfound
    }
  ]
})
