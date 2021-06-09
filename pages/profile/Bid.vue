<template>
    <div class="card">
        <div class="card-header">
            Список заявок
        </div>
        <div class="card-body">
            <div class="row">
                <div class="col-12">
                    <table class="table table-bordered small table-sm">
                        <thead>
                        <tr>
                            <th width="50">#</th>
                            <th>Заказчик</th>
                            <th>Адрес доставки</th>
                            <th>Сумма</th>
                            <th>Время заказа</th>
                            <th colspan="2">Действия</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item, key) in orders">
                            <td>{{key + 1}}</td>
                            <td>{{item.company.name + ` (${item.company.tax_id}) `}}</td>
                            <td>{{item.delivery_address}}</td>
                            <td>{{totalSum(item)}}</td>
                            <td>{{moment(item.created_at)}}</td>
                            <td width="50">
                                <i class="fa fa-th-large cursor-pointer text-primary" aria-hidden="true" @click.prevent="inDetails(item.order_items)" title="Подробно"></i>
                            </td>
                            <td>
                                <select class="form-control form-control-sm" @change="handleStatus(item, $event)">
                                    <option value="0" :selected="item.status == 0 ? true: false">В обработке</option>
                                    <option value="1" :selected="item.status == 1 ? true: false">В пути</option>
                                    <option value="2" :selected="item.status == 2 ? true: false">Доставлен</option>
                                    <option value="3" :selected="item.status == 3 ? true: false">Отменен</option>
                                </select>
                            </td>
                        </tr>
                        <tr v-if="orderItems">
                            <td colspan="7">
                                <OrderItemDetail :items="this.orderItems" />
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import moment from 'moment';
    import OrderItemDetail from "../../components/OrderItemDetail";
    import {put} from "../../helpers/api";
    export default {
        data(){
          return {
              orders: [],
              orderItems: false
          }
        },
        mounted() {
            this.$store.dispatch('loadBids').then((response) => {
                this.orders = this.$store.getters.getBids
            })
        },
        methods: {
            moment(date) {
                return moment(date).format('DD.MM.YYYY h:mm');;
            },
            inDetails(items){
                if (this.orderItems == false){
                    this.orderItems = items
                }else{
                    this.orderItems = false
                }
            },
            handleStatus(item, e){
                this.$store.dispatch('changeStatus', {
                    id: item.id,
                    status: e.target.value,
                }).then((response) => {
                    this.flashSuccess('Успешно')
                })
            },
            totalSum(item){
                let sum = 0;
                item.order_items.map((t) => {
                    sum = sum + parseInt(t.price)
                })
                return sum;
            }
        },
        components: {
            OrderItemDetail
        }
    }
</script>
<style scoped>
    th, td{
        text-align: center;
        vertical-align: middle !important;
    }
    .cursor-pointer{
        cursor: pointer;
    }
</style>
