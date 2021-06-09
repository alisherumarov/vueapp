<template>
    <div class="card">
        <div class="card-header">Настройки</div>
        <div class="card-body">
            <div class="form-check">
                <input type="checkbox" class="form-check-input" @change="toggleSupplierSettings" id="exampleCheck1" v-model="is_supplier">
                <label class="form-check-label" for="exampleCheck1">Настройка поставщика</label>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
          return {
              is_supplier: false,
              company_id: null,
          }
        },
        methods: {
            toggleSupplierSettings(){
                const payload = {
                    company_id: this.company_id,
                    is_supplier: this.is_supplier
                }
                this.$store.dispatch('updaterSupplierSettings', payload)
                    .then((response) => {
                        if (response.status === 200){
                            this.flashSuccess('Успешно обновлено');
                        }
                    })
            }
        },
        mounted() {
            this.$store.dispatch('loadSupplierInfo').then((response) => {
                const company = response.data.company;
                if (company !== null){
                    this.company_id = company.id
                    this.is_supplier = !!company.is_supplier
                }
            })
        }
    }
</script>
