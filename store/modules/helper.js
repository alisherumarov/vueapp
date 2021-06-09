export default {
    state: {
        isLoading: true
    },
    mutations: {
        setLoading(state, payload){
            state.isLoading = payload
        }
    },
    actions: {
    },
    getters: {
        getLoading(state){
            return state.isLoading;
        }
    }
}
