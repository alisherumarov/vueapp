import {del, get, post} from '../../helpers/api'

export default {
    state: {
        categories: []
    },
    actions: {
        loadCategories(ctx){
            return new Promise((resolve, reject) => {
                get('/categories').then((response) => {
                    if (response.data.success){
                        ctx.commit('initCategory', response.data.categories)
                        resolve(response)
                    }
                },error => {
                    reject(error)
                })
            })

        }
    },
    getters: {
        getCategories(state){
            return state.categories;
        }
    },
    mutations: {
        initCategory(state, payload){
            state.categories = payload
        }
    },
}
