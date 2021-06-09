import {del, get, post, put} from '../../helpers/api'

export default {
    state: {
        bids: []
    },
    actions: {
        loadBids(ctx){
            return new Promise((resolve, reject) => {
                get('/bids').then((response) => {
                    if (response.data.success){
                        ctx.commit('init', response.data)
                        resolve(response);
                    }
                }, error => {
                    reject(error);
                })
            })
        },
        changeStatus(ctx, payload){
            return new Promise((resolve, reject) => {
                post(`/bids/status/${payload.id}`, payload).then((response) => {
                    if (response.data.success){
                        ctx.commit('init', response.data)
                        resolve(response);
                    }
                }, error => {
                    reject(error);
                })
            })
        },
    },
    getters: {
        getBids(state){
            return state.bids;
        }
    },
    mutations: {
        init(state, payload){
            state.bids = payload.bids
        }
    },
}
