import Vue from 'vue'
import App from './App.vue'
import router from './router'

import'mint-ui/lib/style.css'
Vue.config.productionTip = false

import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'

import MintUI from 'mint-ui'
Vue.use(MintUI)
import VueResource from "vue-resource";
Vue.use(VueResource);
//post请求注册
Vue.http.options.emulateJSON = true;
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
