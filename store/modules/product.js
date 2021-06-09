import {get, post} from '../../helpers/api';
import store from '../index'

export default {
    state: {
        products: []
    },
    mutations: {
        addProduct(state, payload){
            state.products.push(payload)
        },
        removeProduct(state, payload){
            state.products = state.products.filters((item, index) => {
                return index !== payload;
            })
        },
        setProducts(state, payload){
            state.products = payload
        },
    },
    actions: {
        loadProducts(ctx, sort = false){
            let url = `/products`;
            if (sort.length){
                url = `/products?sortBy=${sort}`;
            }
            store.commit('setLoading', true)
            return new Promise((resolve, reject) => {
                get(url).then((response) => {
                    if (response.status === 200){
                        ctx.commit('setProducts', response.data.products)
                        resolve(response);
                        store.commit('setLoading', false)
                    }
                }, error => {
                    reject(error);
                })
            })
        },
        searchProducts(ctx, payload){
            return new Promise((resolve, reject) => {
                get(`/products?search=${payload}`).then((response) => {
                    if (response.status === 200){
                        ctx.commit('setProducts', response.data.products)
                        resolve(response);
                    }
                }, error => {
                    reject(error);
                })
            })
        },
        filterProducts(ctx, payload){
            return new Promise((resolve, reject) => {
                get(`/products?category=${payload}`).then((response) => {
                    if (response.status === 200){
                        ctx.commit('setProducts', response.data.products)
                        resolve(response);
                    }
                }, error => {
                    reject(error);
                })
            })
        },
    },
    getters: {
        getProducts(state){
            return state.products;
        },
        getProduct(state, index){
            return state.products.filter((item, i) => {
                return i === index;
            });
        },
    }
}
