import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import vuexStore from './store/vuexStore'
import vuetify from './plugins/vuetify'

Vue.use(Vuex)
Vue.config.productionTip = false

const store = new Vuex.Store(vuexStore)

new Vue({
    vuetify,
    store: store,
    render: h => h(App),
}).$mount('#app')
