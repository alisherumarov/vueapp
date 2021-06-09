<template>
    <div class="row">
            <main class="col-md-9">
                <div class="card">
                    <table class="table table-borderless table-shopping-cart">
                        <thead class="text-muted">
                        <tr class="small text-uppercase">
                            <th scope="col">Продукт</th>
                            <th scope="col" width="120">Количество</th>
                            <th scope="col" width="120">Стоимость</th>
                            <th scope="col" class="text-right" width="200"> </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-if="$store.getters.getCart" v-for="item in $store.getters.getCart" class="border-bottom">
                            <td>
                                <figure class="itemside">
                                    <div class="aside">
                                        <img v-if="item.product.images" :src="getMainImage(item.product.images)" class="img-sm">
                                        <img v-else="item.product.images" src="https://via.placeholder.com/80x80.png?text=Нет+изображений" class="img-sm">
                                    </div>
                                    <figcaption class="info">
                                        <router-link :to="`/products/${item.product_id}`" class="title text-dark">{{item.product.product_name}}</router-link>
                                        <p class="text-muted small">Some description here</p>
                                    </figcaption>
                                </figure>
                            </td>
                            <td>
                                <input type="number" class="form-control" pattern="^[1-9]" min="1" :value="item.qty" @change="changedQty(item, $event)">
                            </td>
                            <td width="200">
                                <div class="price-wrap">
                                    <var class="price">UZS {{item.price}}</var> <br>
                                    <small class="text-muted"> UZS {{item.product.unit_price}} за каждую </small>
                                </div> <!-- price-wrap .// -->
                            </td>
                            <td class="text-right">
                                <a title="В избранные" class="btn btn-light"> <i class="fa fa-heart"></i></a>
                                <a href="" @click.prevent="removeCartItem(item)" class="btn btn-light"> Удалить</a>
                            </td>
                        </tr>
                        <tr v-else>Пусто</tr>
                        </tbody>
                    </table>

                    <div class="card-body border-top">
                        <button v-if="$store.getters.getCart" @click.prevent="submitCart" class="btn btn-primary float-md-right"> Купить <i class="fa fa-chevron-right"></i> </button>
                        <router-link to="/" class="btn btn-light"> <i class="fa fa-chevron-left"></i> Продолжить покупку </router-link>
                    </div>
                </div> <!-- card.// -->

                <div class="alert alert-info mt-3">
                    <p class="icontext mb-0"> <i class="icon text-info fa fa-truck"></i> Доставка бесплатная в течении 1-2 недель </p>
                </div>

            </main> <!-- col.// -->
            <aside class="col-md-3">
<!--                <div class="card mb-3">-->
<!--                    <div class="card-header"> Have coupon? </div>-->
<!--                    <div class="card-body">-->
<!--                        <form>-->
<!--                            <div class="form-group">-->
<!--                                <div class="input-group">-->
<!--                                    <input type="text" class="form-control" name="" placeholder="Coupon code">-->
<!--                                        <span class="input-group-append">-->
<!--                                    <button class="btn btn-primary">Apply</button>-->
<!--                                </span>-->
<!--                                </div>-->
<!--                            </div>-->
<!--                        </form>-->
<!--                    </div> &lt;!&ndash; card-body.// &ndash;&gt;-->
<!--                </div>  &lt;!&ndash; card .// &ndash;&gt;-->
                <div class="card mb-3">
                    <div class="card-header">Адрес доставки</div>
                    <div class="card-body">
                        <div v-if="company.delivery_address" class="form-check mb-3">
                            <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="default" v-model="address">
                            <label class="form-check-label" for="exampleRadios1">{{company.delivery_address}}</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" v-model="address">
                            <label class="form-check-label" for="exampleRadios2"> Добавить новый </label>
                        </div>
                        <div v-if="address != 'default'" class="input-group mb-3 mt-2">
                            <input type="text" class="form-control" placeholder="Введите адрес" v-model="newAddress">
                            <div class="input-group-append">
                                <span class="input-group-text" id="basic-addon2">oк</span>
                            </div>
                        </div>
                    </div> <!-- card-body.// -->
                </div>  <!-- card .// -->
                <div class="card">
                    <div class="card-header">Сумма к оплате</div>
                    <div class="card-body">
                        <dl class="dlist-align">
                            <dt>Всего:</dt>
                            <dd class="text-right">{{formatMoney(total)}}</dd>
                        </dl>
                        <p class="text-center mb-3">
                            <img src="img/misc/payments.png" height="26">
                        </p>
                    </div>
                </div>
            </aside>
        </div>
</template>
<script>
    import {post} from "../helpers/api";

    export default {
        data(){
            return {
                company: '',
                address: 'default',
                newAddress: '',
                cartIds: []
            }
        },
        mounted() {
            if (this.$store.getters.getApiToken){
                this.$store.dispatch('loadSupplierInfo').then((response) => {
                    this.company = this.$store.getters.getCurrentCompany
                })
            }
        },
        computed:{
            total(){
                let total = 0;
                this.$store.getters.getCart.map((item) => {
                    total = total + parseInt(item.price)
                })
                return total.toFixed(2)
            }
        },
        methods:{
            formatMoney(number){
                return new Intl.NumberFormat('uz-UZ').format(number) + ' сум'
            },
            getMainImage(images){
                let decodedImages = JSON.parse(images)
                return '/storage/'+decodedImages[0];
            },
            changedQty(item, event){
                if (item.qty != event.target.value && event.target.value != 0){
                    this.$store.dispatch('changeCartItem', {
                        id: item.id,
                        qty: event.target.value,
                    })
                }
            },
            removeCartItem(item){
                this.$store.dispatch('decrement', item.id)
            },
            getCartIds(){
                let ids = []
                this.$store.getters.getCart.map((item) => {
                    ids.push(item.id)
                })
                return ids;
            },
            submitCart(){
                let address = this.company.delivery_address;
                if (this.address != 'default'){
                    if (this.newAddress == null){
                        alert('Новый адрес не может быть пустым');
                        return;
                    }
                    address = this.newAddress;
                }
                let payload = {
                    address,
                    cart_ids: this.getCartIds()
                }
                post('/orders', payload).then((response) => {
                    if (response.data.success){
                        this.flashSuccess('Успешно')
                        this.$router.push('/profile/myorders');
                        this.$store.dispatch('loadCart')
                    }
                })
            }
        },
    }
</script>
<style scoped>
    .itemside{
        display: flex;
        align-items: center;
    }
    .itemside .aside{
        margin-right: 5px;
    }
    .itemside .aside img{
        max-width: 80px;
    }
    .dlist-align{
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #e3e3e3;
    }
</style>
