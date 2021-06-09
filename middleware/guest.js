import store from '../store'
store.dispatch('initialize')
export default function guest ({ next, store }){
    if(store.getters.isLoggedIn){
        return next('/')
    }

    return next()
}
