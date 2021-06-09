<template>
    <div>
        <article class="card  mb-3">
            <h5 class="card-header mb-4">Мои заказы</h5>
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
                        <th>Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-if="$store.getters.getOrders" v-for="order in $store.getters.getOrders">
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
                        <td width="200">
                            <div class="btn-group">
                                <router-link :to="`/order/${order.id}`" class="btn btn-sm btn-outline-primary">Инфо</router-link>
                                <button @click.prevent="cancelOrder" v-if="order.status < 2" class="btn btn-sm btn-outline-info">Отменить</button>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div> <!-- card-body .// -->
        </article> <!-- card.// -->
    </div>
</template>
<script>
    import moment from 'moment';
    export default {
        data(){
            return {
                orders: []
            }
        },
        mounted() {
            this.$store.dispatch('loadOrders')
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
            }
        }
    }
</script>
<style scoped>
    th, td{
        vertical-align: middle !important;
        text-align: center;
    }
</style>
