<template>
    <div>
        <div class="d-flex align-items-center justify-content-end mb-4">
            <select class="form-control sorting" v-model="sortBy" @change="updateProducts" style="width: 200px">
                <option value="1">по популярности</option>
                <option value="2">по цене</option>
                <option value="3">по новизне</option>
            </select>
        </div>
        <div class="row">
            <div v-for="(product, index) in this.$store.getters.getProducts.data" class="col-md-3">
                <div class="card mb-4 shadow-sm position-relative">
                    <img v-if="product.images" class="bd-placeholder-img card-img-top" height="165" style="object-fit: cover" :src="getMainImage(product.images)" :alt="product.product_title">
                    <img v-else="product.images" class="bd-placeholder-img card-img-top" src="https://via.placeholder.com/220x200.png?text=Нет+изображений" :alt="product.product_title">
                    <div class="card-body text-center">
                        <p class="card-text mb-1">
                            <router-link :to="`/products/${product.id}`" exact>{{product.product_name}}</router-link>
                        </p>
                        <div class="price-wrap mb-2">
                            <span class="price">{{formatMoney(product.unit_price)}}</span>
                            <del v-if="product.old_price" class="price-old small">{{product.old_price}}</del>
                        </div>
                        <Counter ref="count"/>
                        <div class="btn-group w-100 mt-1">
                            <router-link :to="`/products/${product.id}`" exact class="btn btn-sm btn-outline-primary">
                                <i class="fa fa-eye" aria-hidden="true"></i>
                            </router-link>
                            <button @click="addToCart(index, product.id)" type="button" class="btn btn-sm btn-outline-primary">
                                <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { get } from "../helpers/api";
    import Counter from "./profile/Counter";

    export default {
        components: {Counter},
        mounted(){
            this.$store.dispatch('loadProducts')
        },
        methods: {
            getMainImage(images){
                let decodedImages = JSON.parse(images)
                return '/storage/'+decodedImages[0];
            },
            addToCart(index, productId){
                this.$store.dispatch('increment', {productId, qty: this.$refs.count[index].count}).then((response) =>{
                    window.scrollTo({top: 0})
                    this.flashSuccess('Успешно')
                })
            },
            formatMoney(number){
                return new Intl.NumberFormat('uz-UZ').format(number) + ' сум'
            },
            updateProducts(){
                this.$store.dispatch('loadProducts', this.sortBy);
            }
        },
        data(){
            return {
                sortBy: 1
            }
        },
    }
</script>
