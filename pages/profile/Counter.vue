<template>
    <div class="btn-group btn-group-sm w-100" role="group" aria-label="Basic example">
        <button @click="decrement" type="button" class="btn btn-sm btn-outline-primary">-</button>
        <input type="text" v-model="count" class="btn btn-sm border border-primary" disabled style="width: 50px">
        <button @click.prevent="increment" type="button" class="btn btn-sm btn-outline-primary">+</button>
    </div>
</template>
<script>
    export default {
        methods:{
            decrement(){
                if (this.count > 1){
                    this.count = this.count - 1;
                }
            },
            increment(){
                this.count = this.count + 1;
            },
        },
        data(){
            return {
                count: 1
            }
        }
    }
</script>
