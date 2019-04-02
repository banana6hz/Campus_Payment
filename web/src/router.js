import Vue from 'vue'
import Router from 'vue-router'
import login from './views/login.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
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
        name:'homeContainer',
        component: () => import(/* webpackChunkName: "about" */ './views/home/homeContainer.vue')
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
        path:'/search',
        name:'search',
        component: () => import(/* webpackChunkName: "about" */ './views/search/search.vue'),
        children:[{
          path:'/searchWater',
          name:'searchWater',
          component: () => import('./views/search/searchWater')
        },{
          path:'/searchWaterRecord',
          name:'searchWaterRecord',
          component: () => import('./views/search/searchWaterRecord')
        },{
          path:'/searchEnergyCharge',
          name:'searchEnergyCharge',
          component: () => import('./views/search/searchEnergyCharge')
        },{
          path:'/searchEnergyChargeRecord',
          name:'searchEnergyChargeRecord',
          component: () => import('./views/search/searchEnergyChargeRecord')
        },{
          path:'/searchExam',
          name:'searchExam',
          component: () => import('./views/search/searchExam')
        },{
          path:'/searchExamRecord',
          name:'searchExamRecord',
          component: () => import('./views/search/searchExamRecord')
        },{
          path:'/searchEducation',
          name:'searchEducation',
          component: () => import('./views/search/searchEducation')
        },{
          path:'/searchEducationRecord',
          name:'searchEducationRecord',
          component: () => import('./views/search/searchEducationRecord')
        }]
      },{
        path:'/payment',
        name:'payment',
        component: () => import(/* webpackChunkName: "about" */ './views/payment/payment.vue'),
      },{
        path:'/suggest',
        name:'suggest',
        component: () => import(/* webpackChunkName: "about" */ './views/suggest/suggest.vue'),
      },{
        path:'/chargeNotice',
        name:'chargeNotice',
        component: () => import(/* webpackChunkName: "about" */ './views/charge/chargeNotice.vue'),
      }]
    }
  ]
})
