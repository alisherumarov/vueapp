import { get, post, put } from './../../helpers/api';

export default {
    state: {
        token: null,
        user_id: null,
        user: null,
    },
    mutations: {
        setUser(state, data){
            state.user_id = data.user_id
            state.token = data.token
            localStorage.setItem('token', data.token)
            localStorage.setItem('user_id', data.user_id)
        },
        logout(state){
            localStorage.removeItem('token')
            localStorage.removeItem('user_id')
            state.user_id = null
            state.token = null
        },
        setUserObj(state, payload){
            state.user = payload
        },
        updateUser(state, payload){
            state.user = payload
        }
    },
    actions: {
        initialize(ctx) {
            let data = {};
            if (localStorage.getItem('token') == 'null'){
                data.token = null
                data.user_id = null
            }else{
                data.token = localStorage.getItem('token')
                data.user_id = localStorage.getItem('user_id')
            }
            ctx.commit('setUser', data)
        },
        authInit(ctx, payload) {
            ctx.commit('setUser', payload)
        },
        loadCurrentUser(ctx){
            return new Promise((resolve, reject) => {
                get('/user').then((response) => {
                        ctx.commit('setUserObj', response.data.user)
                        resolve(response)
                    }, error => {
                    reject(error)
                })
            })
        },
        updateCurrentUser(ctx, payload){
            return new Promise((resolve, reject) => {
                post('/user', payload).then(response => {
                    if (response.status === 200){
                        ctx.commit('updateUser', payload)
                    }
                    resolve(response);
                }, error => {
                    reject(error);
                })
            })
        }
    },
    getters: {
        isLoggedIn(state){
            return state.user_id == null ? false : true;
        },
        getApiToken(state){
            return state.token;
        },
        currentUser(state){
            return state.user;
        },
    }
}
