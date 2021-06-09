<template>
    <div class="card mb-10">
        <div class="card-header">
            <nav class="header-navigation">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="#">Главная</a></li>
                    <li class="breadcrumb-item"><a href="#">Категория</a></li>
                    <li class="breadcrumb-item"><a href="#">Товары</a></li>
                    <li class="breadcrumb-item active" aria-current="page">{{product.product_name}}</li>
                </ol>

                <div class="btn-group">
                    <a href="#" class="btn btn-outline-primary">Поделиться</a>
                    <a href="#" class="btn btn-outline-primary">Назад</a>
                </div>
            </nav>
        </div>
        <div class="card-body">
            <div class="row">
                <div class="col-7">
                    <div class="product-info">
                        <div class="product-gallery">
                            <div class="product-gallery-thumbnails">
                                <ol class="thumbnails-list list-unstyled">
                                    <li v-if="images" v-for="img in images"><img :src="'/storage/'+ img"></li>
                                </ol>
                            </div>
                            <div class="product-gallery-featured">
                                <img v-if="product.images" class="bd-placeholder-img card-img-top" height="220" style="object-fit: cover" :src="getMainImage(product.images)" :alt="product.product_title">
                                <img v-else="product.images" class="bd-placeholder-img card-img-top" style="max-width: 250px" src="https://via.placeholder.com/220x200.png?text=Нет+изображений" :alt="product.product_title">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-5">
                    <div class="product-payment-details">
                        <p class="last-sold text-muted mb-0"><small>Артикул: {{product.artikul}}</small></p>
                        <p class="last-sold text-muted"><small>Покупали 50 раз</small></p>
                        <h5 class="product-title mb-2" style="line-height: normal">{{product.product_name}}</h5>
                        <h6 class="product-price font-weight-bold mt-3"><i class="fa fa-credit-card"></i> UZS {{product.unit_price}}</h6>
                        <p class="border-bottom pb-2"> Доступность: <span class="badge badge-success badge-pill">Есть в наличие</span> </p>
                        <p v-if="product.discount" class="border-bottom pb-2"> Скидка: <span class="badge badge-danger badge-pill">-{{product.discount}}%</span> </p>
                        <p v-if="product" class="mb-0"><i class="fa fa-truck"></i> Доставка по всей республики</p>

                        <div class="form-group border-top mt-3 pt-2">
                            <div class="input-group d-flex justify-content-between mb-3">
                                <div class="btn-group" role="group" aria-label="Basic example">
                                    <button type="button" class="btn btn-light border">-</button>
                                    <input type="number" style="width: 80px;" class="text-center border" name="quantity" min="1" id="quant" value="1">
                                    <button type="button" class="btn btn-light border">+</button>
                                </div>
                                <button class="btn btn-primary btn-sm">В корзину</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <div class="product-seller-recommended">
                        <div v-if="product.features !== undefined" class="product-description mb-5">
                            <h2 class="mb-5">Характеристики товара</h2>
                            <div class="row mb-2" v-if="product.features.length" v-for="option in product.features">
                                <div class="col-4">{{option.name}}</div>
                                <div class="col-8">{{option.value}}</div>
                            </div>
                            <h2 class="mb-5">Описание</h2>
                            <p>{{product.product_description}}</p>
                        </div>
                        <div class="product-comments">
                            <h5 class="mb-2">Оставить отзыв</h5>
                            <div class="form-group">
                                <textarea class="form-control"></textarea>
                            </div>
                            <div class="form-group text-right">
                                <button class="btn btn-sm btn-primary ">Отправить</button>
                            </div>
                            <h5 class="mb-5">Последние отзывы</h5>
                            <ol class="list-unstyled last-questions-list">
                                <li><i class="fa fa-comment"></i> <span>Hello david, can i pay with credit card?</span></li>
                                <li><i class="fa fa-comment"></i> <span>can i send it to another address?</span></li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            <hr>
            <h4 class="mb-3">Другие товары этого продавца</h4>
            <div class="recommended-items card-deck row">
                <div class="col-3">
                    <div class="card ml-0 mr-0">
                        <img src="https://via.placeholder.com/157x157" alt="" class="card-img-top w-100">
                        <div class="card-body">
                            <h5 class="card-title">U$ 55.00</h5>
                            <span class="text-muted"><small>T-Shirt Size X - Large - Nickony Brand</small></span>
                        </div>
                    </div>
                </div>
                <div class="col-3">
                    <div class="card ml-0 mr-0">
                        <img src="https://via.placeholder.com/157x157" alt="" class="card-img-top w-100">
                        <div class="card-body">
                            <h5 class="card-title">U$ 55.00</h5>
                            <span class="text-muted"><small>T-Shirt Size X - Large - Nickony Brand</small></span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- /.recommended-items-->
            <p class="mb-5 mt-2">
                <a href="#" class="btn btn-link">Посмотреть все</a>
            </p>
        </div>
    </div>
</template>
<script>
    import { get } from "../helpers/api";
    export default {
        mounted(){
            const galleryThumbnail = document.querySelectorAll(".thumbnails-list li");
            const galleryFeatured = document.querySelector(".product-gallery-featured img");
            galleryThumbnail.forEach((item) => {
                item.addEventListener("mouseover", function () {
                    let image = item.children[0].src;
                    galleryFeatured.src = image;
                });
            });

            get('/products/' + this.$route.params.id).then((response) => {
                if (response.data.success === true){
                    this.product = response.data.product;
                    if (response.data.product.images !== null){
                        this.images = JSON.parse(response.data.product.images)
                    }
                }else{
                    if (response.data.error !== undefined){
                        this.$router.push({
                            name: 'notFound'
                        })
                        this.flashError('Товар не найден!')
                    }
                }
            })
        },
        data(){
            return {
                product: '',
                images: []
            }
        },
        methods:{
            getMainImage(images){
                let decodedImages = JSON.parse(images)
                return '/storage/'+decodedImages[0];
            },
        }
    }
</script>
<style>
    .header-navigation {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        font-size: .80rem;
    }
    .header-navigation a {
        font-size: .80rem;
    }
    .header-navigation .breadcrumb {
        margin-bottom: 0;
        background-color: transparent;
        padding: 0.20rem 1rem;
    }
    .header-navigation .btn-group {
        margin-left: auto;
    }
    .header-navigation .btn-share {
        position: relative;
    }
    .header-navigation .btn-share::after {
        content: "";
        width: 1px;
        height: 50%;
        background-color: #ccc;
        position: absolute;
        top: 50%;
        left: 100%;
        transform: translateY(-50%);
    }
    ol{
        margin: 0;
    }
    .store-body .product-info {
        width: 60%;
        border-right: 1px solid rgba(0,0,0,.125);
    }
    .store-body .product-payment-details {
        width: 40%;
        padding: 15px 15px 0 15px;
    }
    .product-info .product-gallery {
        display: flex;
        flex-direction: row;
    }
    .product-gallery-featured {
        display: flex;
        width: 100%;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        margin-left: 15px;
        cursor: zoom-in;
    }
    .product-gallery-thumbnails .thumbnails-list li {
        margin-bottom: 5px;
        cursor: pointer;
        position: relative;
        width: 70px;
        height: 70px;
        overflow: hidden;
    }
    .thumbnails-list li img {
        display: block;
        object-fit: contain;
        width: 100%;
        height: 100%;
    }
    .product-gallery-thumbnails .thumbnails-list li:hover::before {
        content: "";
        width: 3px;
        height: 100%;
        background: #007bff;
        position: absolute;
        top: 0;
        left: 0;
    }
    .product-info .product-seller-recommended {
        padding: 20px 20px 0 20px;
    }
    .product-comments textarea {
        height: 150px;
    }
    .last-questions-list li {
        margin-bottom: 20px;
    }
    .last-questions-list li span {
        padding-left: 10px;
    }
</style>
