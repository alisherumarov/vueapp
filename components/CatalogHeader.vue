<template>
    <div v-if="show" class="d-flex align-items-center justify-content-end mb-4">
<!--        <div class="items-counter">Найдено 40 товаров</div>-->
        <select class="form-control sorting" v-model="sortBy" @change="updateProducts">
            <option value="1">по популярности</option>
            <option value="2">по цене</option>
            <option value="3">по новизне</option>
        </select>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                sortBy: 1,
                show: false
            }
        },
        methods: {
            updateProducts(){
                this.$store.dispatch('loadProducts', this.sortBy);
            }
        }
    }
</script>
<style scoped>
    .sorting{
        width: 200px;
    }
</style>
