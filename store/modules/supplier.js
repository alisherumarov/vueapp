import { get, post, put } from '../../helpers/api'

export default {
    state: {
        company: {},
    },
    mutations: {
        setCompany(state, payload){
            state.company = payload
        },
    },
    actions: {
        loadSupplierInfo(ctx){
            return new Promise((resolve, reject) => {
                get('/supplier-info').then((response) => {
                    if (response.status === 200){
                        ctx.commit('setCompany', response.data.company)
                        resolve(response);
                    }
                }, error => {
                    reject(error);
                })
            })
        },
        updaterSupplierInfo(ctx, payload){
            return new Promise((resolve, reject) => {
                post('/supplier-info', payload).then((response) => {
                    if (response.status === 200){
                        ctx.commit('setCompany', response.data.company)
                        resolve(response);
                    }
                }, error => {
                    reject(error);
                })
            })
        },
        updaterSupplierSettings(ctx, payload){
            return new Promise((resolve, reject) => {
                post('/supplier-settings', payload).then((response) => {
                    if (response.status === 200){
                        ctx.commit('setCompany', response.data.company)
                        resolve(response);
                    }
                }, error => {
                    reject(error);
                })
            })
        },
    },
    getters: {
        getCurrentCompany(state){
            return state.company
        },
    }
}
