<template>
    <table class="table table-bordered table-sm mt-3">
        <tr>
            <th>#</th>
            <th>Наименовае товаров</th>
            <th>Кол-во</th>
            <th>Сумма</th>
            <th>Скидка</th>
            <th>Итого</th>
        </tr>
        <tr v-if="items.length" v-for="(item, i) in items">
            <td>{{i+1}}</td>
            <td>{{item.product.product_name}}</td>
            <td>{{item.qty}}</td>
            <td>{{item.price / item.qty}}</td>
            <td>{{item.discount}}</td>
            <td>{{item.price}}</td>
        </tr>
        <tr>
            <td colspan="5" class="font-weight-bold text-left">Итого:</td>
            <td class="font-weight-bold">{{totalSum}}</td>
        </tr>
    </table>
</template>
<script>
    export default {
        props: ['items'],
        computed:{
          totalSum(){
              let sum = 0
              this.items.map((item) => {
                  sum = sum + parseInt(item.price);
              })
              return parseFloat(sum).toFixed(2)
          }
        },
        mounted() {
        }
    }
</script>
