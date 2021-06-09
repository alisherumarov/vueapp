import {del, get, post, put} from '../../helpers/api'

export default {
    state: {
        cart: []
    },
    actions: {
        increment(ctx, payload){
            post('/cart', payload).then((response) => {
                if (response.data.success){
                    ctx.commit('init', response.data.cart_products)
                }
            })
        },
        changeCartItem(ctx, {id, qty}){
            put(`/cart/${id}`, {qty: qty}).then((response) => {
                if (response.data.success){
                    ctx.commit('init', response.data.cart_products)
                }
            })
        },
        decrement(ctx, id){
            del(`/cart/${id}`).then((response) => {
                if (response.data.success){
                    ctx.commit('init', response.data.cart_products)
                }
            })
        },
        loadCart(ctx){
            return new Promise((resolve, reject) => {
                get('/cart').then((response) => {
                    if (response.data.success){
                        ctx.commit('init', response.data.cart_products)
                        resolve(response)
                    }
                }, error => {
                    reject(error)
                })
            })

        }
    },
    getters: {
        getCart(state){
            return state.cart;
        }
    },
    mutations: {
        init(state, payload){
            state.cart = payload
        }
    },
}
