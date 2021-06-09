<template>
    <div class="input-group" style="width:60%">
        <autocomplete
                ref="search"
                source="/api/products?search="
                results-property="products"
                :request-headers="authHeaders"
                placeholder="Введите для поиска"
                @selected="selectedProduct"
                results-display="product_name">
        </autocomplete>
    </div>
</template>
<script>
    import Autocomplete from 'vuejs-auto-complete'

    export default {
        components: {
            Autocomplete
        },
        computed: {
            authHeaders () {
                return {
                    Authorization: 'Bearer ' + this.$store.getters.getApiToken
                }
            },
        },
        methods:{
            selectedProduct(item){
                this.$router.push('/products/'+ item.value)
            }
        }
    }
</script>
<style>
    .autocomplete__inputs input{
        height: 37px;
    }
    .autocomplete__icon.autocomplete--clear img{
        vertical-align: top;
    }
</style>
