<template>
    <div>
        <article class="card  mb-3">
            <h5 class="card-header mb-4">Заказ #{{order.id}}</h5>
            <div class="card-body table-responsive">
                <table class="table table-sm table-bordered small">
                    <thead>
                    <tr>
                        <th>Номер заказа</th>
                        <th>Дата заказа</th>
                        <th>Статус</th>
                        <th>Доставка на имя</th>
                        <th>Сумма заказа</th>
                        <th>Метод оплаты</th>
                        <th>Адрес доставки</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>#{{order.id}}</td>
                        <td><i class="fa fa-calendar-alt"></i> {{moment(order.created_at)}}</td>
                        <td>
                            <span v-if="order.status == 0" class="badge badge-pill badge-warning">В обработке</span>
                            <span v-else-if="order.status == 1" class="badge badge-pill badge-info">В пути</span>
                            <span v-else-if="order.status == 2" class="badge badge-pill badge-success">Доставлено</span>
                            <span v-else-if="order.status == 3" class="badge badge-pill badge-danger">Отменен</span>
                        </td>
                        <td>{{username(order)}}</td>
                        <td>{{order.total_sum}}</td>
                        <td>Перечисление</td>
                        <td>{{order.delivery_address}}</td>
                    </tr>
                    </tbody>
                </table>
            </div> <!-- card-body .// -->
        </article> <!-- card.// -->
        <div class="card">
            <div class="card-header">ЗАКАЗАННЫЕ ПОЗИЦИИ</div>
            <div class="card-body">
                <table class="table table-sm small table-bordered">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Название товара</th>
                        <th>Артикул</th>
                        <th>Кол-во</th>
                        <th>Цена</th>
                        <th>Итого</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item, index) in order.order_items">
                        <td>{{index+1}}</td>
                        <td class="text-left">{{item.product.product_name}}</td>
                        <td>{{item.product.artikul}}</td>
                        <td>{{item.qty}}</td>
                        <td>{{item.product.unit_price}}</td>
                        <td>{{item.price}}</td>
                    </tr>
                    </tbody>
                    <tfoot>
                    <tr>
                        <td colspan="4"></td>
                        <td class="font-weight-bold">Итого к оплате:</td>
                        <td class="font-weight-bold">{{order.total_sum}}</td>
                    </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
    import moment from 'moment';
    import {get} from "../../helpers/api";
    export default {
        data(){
            return {
                order: []
            }
        },
        mounted() {
            get('/orders/' + this.$route.params.id).then((response) => {
                if (response.data.success === true){
                    this.order = response.data.order;
                }else{
                    if (response.data.error !== undefined){
                        this.$router.push({
                            name: 'notFound'
                        })
                        this.flashError('Заказ не найден!')
                    }
                }
            })
        },
        methods: {
            moment(date) {
                return moment(date).format('DD.MM.YYYY h:mm');;
            },
            username(order){
                if (order.user !== undefined && order.user.first_name !== null && order.user.last_name){
                    return order.user.first_name + ' ' + order.user.last_name
                }else if (order.user !== undefined && order.user.email !== null){
                    return order.user.email
                }
            },
            cancelOrder(){
                if (confirm('Вы уверены?', null)){

                }
            },
        },
    }
</script>
<style scoped>
    th, td{
        vertical-align: middle !important;
        text-align: center;
    }
</style>
