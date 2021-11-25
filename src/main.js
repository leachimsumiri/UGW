import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import vuexStore from './store/vuexStore'

Vue.use(Vuex)
Vue.config.productionTip = false

const store = new Vuex.Store(vuexStore)

new Vue({
    store: store,
    render: h => h(App),
}).$mount('#app')
