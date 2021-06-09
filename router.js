import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter)
import store from './store';
import guest from "./middleware/guest";
import auth from "./middleware/auth";
import NProgress from 'nprogress';

const routes = [
    {
        path: '/',
        component: () => import('./pages/Home'),
        name: 'home',
        meta: { middleware: [ auth ] },
    },
    {
        path: '/cart',
        component: () => import('./pages/Cart'),
        name: 'cart',
        meta: { middleware: [ auth ] },
    },
    {
        path: '/checkout',
        component: () => import('./pages/Checkout'),
        name: 'checkout',
        meta: { middleware: [ auth ] },
    },
    {
        path: '/sign',
        component: () => import('./pages/Login'),
        name: 'login',
        meta: { middleware: [ guest ] }
    },
    {
        path: '/profile',
        component: () => import('./pages/Profile'),
        name: 'profile',
        meta: { middleware: [ auth ] },
        children: [
            {
                path: 'account',
                name: 'profile.account',
                component: () => import('./pages/profile/Account'),
                meta: { middleware: [ auth ] }
            },
            {
                path: 'myorders',
                name: 'profile.myorders',
                component: () => import('./pages/profile/MyOrder'),
                meta: { middleware: [ auth ] }
            },
            {
                path: '/profile/favorites',
                name: 'profile.favorites',
                component: () => import('./pages/profile/Favorite'),
                meta: { middleware: [ auth ] }
            },
            {
                path: '/profile/settings',
                name: 'profile.settings',
                component: () => import('./pages/profile/Settings'),
                meta: { middleware: [ auth ] }
            },
            {
                path: '/profile/products',
                name: 'profile.products',
                component: () => import('./pages/profile/MyProduct'),
                meta: { middleware: [ auth ] },
            },
            {
                path: '/profile/bids/',
                name: 'profile.bids',
                component: () => import('./pages/profile/Bid'),
                meta: { middleware: [ auth ] },
            },
            {
                path: '/profile/products/add',
                name: 'profile.products.add',
                component: () => import('./pages/profile/AddProduct'),
                meta: { middleware: [ auth ] }
            },
            {
                path: '/profile/products/:id',
                name: 'profile.products.product',
                component: () => import('./pages/profile/MyProductItem'),
                meta: { middleware: [ auth ] },
            },
            {
                path: '/profile/supplier/settings',
                name: 'profile.supplier.settings',
                component: () => import('./pages/profile/SupplierSettings'),
                meta: { middleware: [ auth ] }
            },
        ]
    },
    {
        path: '/products/:id',
        name: 'products.product',
        component: () => import('./pages/Product'),
        meta: { middleware: [ auth ] },
    },
    {
        path: '/order/:id',
        name: 'order.item',
        component: () => import('./pages/profile/MyOrderItem'),
        meta: { middleware: [ auth ] },
    },
    {
        path: '*',
        component: () => import('./pages/NotFound'),
        name: 'notFound',
    },
]

const router = new VueRouter({
    routes,
    mode: 'history'
})
router.beforeEach((to, from, next) => {
    if (!to.meta.middleware) {
        return next()
    }
    if (from.name == 'login'){
        window.location.reload()
    }
    const middleware = to.meta.middleware
    const context = {
        to,
        from,
        next,
        store
    }
    return middleware[0]({
        ...context
    })
})

router.beforeResolve((to, from, next) => {
    if (to.name) {
        NProgress.start()
        store.commit('setLoading', true)
    }
    next()
})

router.afterEach((to, from) => {
    NProgress.done()
    store.commit('setLoading', false)
})


export default router
