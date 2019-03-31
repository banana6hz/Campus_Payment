import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/HomePage',
      name: 'HomePage',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/home/HomePage.vue'),
      children: [{
        path:'/',
        name:'homes',
        component: () => import(/* webpackChunkName: "about" */ './views/home/homes.vue')
      },{
        path:'/userPerson',
        name:'userPerson',
        component: () => import(/* webpackChunkName: "about" */ './views/users/userPerson.vue'),
        children:[{
          path:'/',
          name:'userInformation',
          component: () => import(/* webpackChunkName: "about" */ './views/users/userInformation.vue'),
        },{
            path:'/userInformation',
            component: () => import(/* webpackChunkName: "about" */ './views/users/userInformation.vue'),
        },{
          path:'/changePassword',
          name:'changePassword',
          component: () => import(/* webpackChunkName: "about" */ './views/users/changePassword.vue'),
        },{
          path:'/addInformation',
          name:'addInformation',
          component: () => import(/* webpackChunkName: "about" */ './views/users/addInformation.vue'),
        }]
      },{
        path:'/suggest',
        name:'suggest',
        component: () => import(/* webpackChunkName: "about" */ './views/suggest/suggest.vue'),
      }]
    }
  ]
})
