<template>
    <div class="card">
        <div class="card-header d-flex align-items-center justify-content-between">
            <h6 class="m-0">Список товаров</h6>
            <router-link to="/profile/products/add" class="btn btn-sm btn-outline-primary" exact>Добавить</router-link>
        </div>
        <div class="card-body">
            <div class="row">
                <div class="col-md-4" v-for="product in products.data">
                    <div class="card mb-4 shadow-sm">
                        <img v-if="product.images" class="bd-placeholder-img card-img-top" height="220" style="object-fit: cover" :src="getMainImage(product.images)" :alt="product.product_title">
                        <img v-else="product.images" class="bd-placeholder-img card-img-top" src="https://via.placeholder.com/220x200.png?text=Нет+изображений" :alt="product.product_title">
                        <div class="card-body text-center">
                            <p class="card-text mb-1">{{product.product_name}}</p>
                            <div v-if="product.unit_price" class="price-wrap badge badge-pill badge-primary mb-2">
                                <span class="price">{{product.unit_price}}</span>
                            </div>
                            <div class="price-wrap badge badge-pill badge-primary mb-2">
                                <i class="fa fa-star-half-o" aria-hidden="true"></i>
                            </div>
                            <div class="price-wrap badge badge-pill badge-primary mb-2">
                                <div>5 <sup><i class="fa fa-commenting-o" aria-hidden="true"></i></sup></div>
                            </div>
                            <div class="btn-group btn-group-sm w-100 mt-1" role="group" aria-label="Basic example">
                                <router-link :to="`/profile/products/${product.id}`" class="btn btn-sm btn-primary" title="Посмотреть">
                                    <i class="fa fa-eye" aria-hidden="true"></i>
                                </router-link>
                                <router-link :to="`/profile/products/${product.id}`" class="btn btn-sm btn-primary border-left" title="Редактировать">
                                    <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                                </router-link>
                                <router-link :to="`/profile/products/${product.id}`" class="btn btn-sm btn-primary border-left" title="Удалить">
                                    <i class="fa fa-trash" aria-hidden="true"></i>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { get } from '../../helpers/api';

    export default {
        data(){
            return {
                products: []
            }
        },
        methods:{
            getMainImage(images){
                let decodedImages = JSON.parse(images)
                return '/storage/'+decodedImages[0];
            }
        },
        mounted() {
            get('/my-products').then((response) => {
                if (response.data.success){
                    this.products = response.data.products
                }
            })
        }
    }
</script>
