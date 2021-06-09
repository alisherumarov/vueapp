import Vue from 'vue'
import router from './router'
import store from './store'
import MainApp from './MainApp'
import Vuelidate from 'vuelidate'
import VueFlashMessage from 'vue-flash-message';
import Multiselect from 'vue-multiselect'

Vue.component('multiselect', Multiselect)
Vue.use(VueFlashMessage, {
    messageOptions: {
        timeout: 5000,
        pauseOnInteract: true
    }
});
Vue.use(Vuelidate)
const app = new Vue({
    el: '#app',
    template: `<main-app></main-app>`,
    components: { MainApp },
    router,
    store,
})

