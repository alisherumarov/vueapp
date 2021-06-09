<template>
    <ul class="list-group">
        <router-link to="/profile/account" active-class="active" class="list-group-item" exact>Аккаунт</router-link>
        <router-link to="/profile/myorders" active-class="active" class="list-group-item" exact>Мои заказы</router-link>
        <router-link to="/profile/favorites" active-class="active" class="list-group-item" exact>Избранные</router-link>
        <router-link to="/profile/settings" active-class="active" class="list-group-item" exact>Настройки</router-link>
        <router-link to="/profile/products" active-class="active" class="list-group-item" exact>Мои продукты </router-link>
        <router-link to="/profile/supplier/settings" v-if="is_supplier" active-class="active" class="list-group-item" exact>Настройки продавца </router-link>
        <router-link to="/profile/bids" v-if="is_supplier" active-class="active" class="list-group-item d-flex justify-content-between align-items-center" exact>
            Заявки
            <span class="badge badge-pill badge-primary">3</span>
        </router-link>
    </ul>
</template>
<script>
    export default {
        data(){
            return{
                is_supplier: false
            }
        },
        methods: {},
        mounted() {
            this.$store.dispatch('loadSupplierInfo').then((response) => {
                const company = response.data.company;
                if (company !== null){
                    this.is_supplier = !!company.is_supplier
                }
            })

        }
    }
</script>
<style scoped>
    .list-group-item:hover{
        text-decoration: none;
    }
</style>
