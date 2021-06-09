import store from '../store'
store.dispatch('initialize')
export default function auth ({ next, store }){
    if(!store.getters.isLoggedIn){
        return next('/sign')
    }

    return next()
}
