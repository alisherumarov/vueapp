<template>
    <div>
        <Header/>
        <div class="container">
            <div class="content">
                <flash-message></flash-message>
                <router-view></router-view>
            </div>
        </div>
        <div v-if="$store.getters.getLoading" class="preloader">
            <div class="lds-ripple">
                <div></div>
                <div></div>
            </div>
        </div>
    </div>
</template>
<script>
    import Header from "./components/Header";
    export default {
        mounted() {
            this.$store.dispatch('initialize')
            if (this.$store.getters.isLoggedIn){
                this.$store.dispatch('loadSupplierInfo')
                this.$store.dispatch('loadCurrentUser')
            }
        },
        components: {Header}
    }
</script>
