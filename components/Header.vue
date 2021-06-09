<template>
    <header class="header">
        <div class="container">
            <div class="banner">
                <a href="http://venkon.uz/" target="_blank">
                    <img src="/img/banner.png" class="w-100" height="95" alt="">
                </a>
            </div>
        </div>
        <div class="p-3 px-md-4 mb-3 bg-white border-bottom border-top shadow-sm">
            <div class="container d-flex flex-column flex-md-row align-items-center">
                <h5 class="my-0 mr-md-auto font-weight-normal">
                    <router-link to="/" class="logo" exact>Торговая площадка</router-link>
                </h5>
                <div class="right w-75 d-flex align-items-center justify-content-between">
                    <Search />
                    <nav class="my-2 my-md-0 mr-md-3 d-flex justify-content-between align-items-center flex-row">
<!--                        <a class="p-2 text-dark" href="#">-->
<!--                            <i class="fa fa-location-arrow" aria-hidden="true"></i>-->
<!--                            <span class="ml-1">Ташкент</span>-->
<!--                        </a>-->
<!--                        <a class="p-2 text-dark" href="#">-->
<!--                            <i class="fa fa-heart-o" aria-hidden="true" style="font-size: 20px">-->
<!--                                <sup class="badge badge-pill badge-danger small">0</sup>-->
<!--                            </i>-->
<!--                        </a>-->
                        <router-link to="/cart" class="p-2 text-dark">
                            <i class="fa fa-shopping-cart" aria-hidden="true" style="font-size: 20px">
                                <sup class="badge badge-pill badge-danger small">{{this.$store.getters.getCart.length}}</sup>
                            </i>
                        </router-link>
                        <router-link v-if="!currentUser" class="btn btn-outline-primary ml-2" to="/sign">Логин</router-link>
                        <div v-else="currentUser" class="dropdown ml-4">
                            <a @click.prevent="toggleProfile" style="font-size: 26px">
                                <i class="fa fa-user-circle-o" aria-hidden="true"></i>
                            </a>
                            <div @click="handleUserMenu" :class="isHidden ? 'dropdown-menu' : 'dropdown-menu d-block'" style="right: 0; left: unset">
                                <router-link to="/profile/account" class="dropdown-item border-bottom">Профиль</router-link>
                                <a class="dropdown-item" @click.prevent="logout" href="#">Выход</a>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
    import Search from "./Search";
    export default {
        methods: {
            logout() {
                this.$store.commit('logout');
                this.$router.push('/sign');
            },
            toggleProfile(){
                this.isHidden = !this.isHidden
            },
            handleUserMenu(e){
                this.isHidden = true
            }
        },
        data(){
          return {
              isHidden: true,
          }
        },
        components: {
            Search
        },
        computed: {
            currentUser() {
                return this.$store.getters.isLoggedIn
            }
        },
        mounted() {
            if (this.currentUser){
                this.$store.dispatch('loadCart')
            }
        }
    }
</script>
<style scoped>
    .logo:hover{
        text-decoration: none;
    }
</style>
