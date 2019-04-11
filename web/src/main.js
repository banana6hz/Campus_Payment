import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import store  from './store/index'
import vuex from 'vuex'
import 'element-ui/lib/theme-chalk/index.css'
import './style/main.scss'

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(vuex);

import person_title from './components/personContTitle'
Vue.component('person-title', person_title);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
