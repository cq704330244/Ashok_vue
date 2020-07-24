import Vue from 'vue'
import Router from 'vue-router'
import Login from '../view/login/Login'
import Home from '../view/home/index.vue'
import Notfound from '../view/notFound/index.vue'
import DeskTop from '../view/deskTop/index.vue'
import Product from '../view/product/index.vue'
import upLoad from '../view/imgupload/index.vue'
import Guide from '../view/guide/index.vue'
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
      component: Home,
      children: [
        {
          path: '/home/deskTop',
          name: 'deskTop',
          component: DeskTop
        },
        {
          path: '/home/product',
          name: 'product',
          component: Product
        },
        {
          path: '/home/guide',
          name: 'guide',
          component: Guide
        },
        {
          path: '/home/upLoad',
          name: 'upLoad',
          component: upLoad
        },
        {
          path: '/home/*',
          name: '404Not',
          component: Notfound
        }
      ]
    },
    {
      path: '*',
      name: '404notFound',
      component: Notfound
    }
  ]
})
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}
