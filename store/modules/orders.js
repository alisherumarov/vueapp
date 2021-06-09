import {del, get, post, put} from '../../helpers/api'

export default {
    state: {
        orders: []
    },
    actions: {
        loadOrders(ctx){
            return new Promise((resolve, reject) => {
                get('/orders').then((response) => {
                    if (response.data.success){
                        ctx.commit('init', response.data.orders.data)
                    }
                }, error => {
                    reject(error);
                })
            })
        },
        removeOrder(ctx, id){
            return new Promise((resolve, reject) => {
                del(`/orders/${id}`).then((response) => {
                    if (response.data.success){
                        ctx.commit('init', response.data.orders.data)
                    }
                }, error => {
                    reject(error);
                })
            })
        },
    },
    getters: {
        getOrders(state){
            return state.orders;
        }
    },
    mutations: {
        init(state, payload){
            state.orders = payload
        },
    },
}
