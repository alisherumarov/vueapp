import Vue from 'vue';
import Vuex from 'vuex';
import user from "./modules/user";
import helper from "./modules/helper";
import supplier from "./modules/supplier";
import product from "./modules/product";
import cart from "./modules/cart";
import orders from "./modules/orders";
import bids from "./modules/bids";
import category from "./modules/category";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        user,
        helper,
        supplier,
        product,
        cart,
        orders,
        bids,
        category
    }
})
