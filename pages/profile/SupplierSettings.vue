<template>
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-header">Настройки продавца</div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-6">
                            <div class="form-check">
                                <input type="checkbox" class="form-check-input" id="exampleCheck1" v-model="shipment">
                                <label class="form-check-label" for="exampleCheck1">Есть доставка</label>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="form-check">
                                <input type="checkbox" class="form-check-input" id="exampleCheck2" v-model="pickup">
                                <label class="form-check-label" for="exampleCheck2">Есть самовывоз</label>
                            </div>
                        </div>
                    </div>
                    <div class="form-group mt-3">
                        <label for="">Краткое описание о вашей компании</label>
                        <textarea class="form-control" rows="5" v-model="description"></textarea>
                    </div>
                    <div class="form-group">
                        <label for="">Условия оплаты</label>
                        <textarea class="form-control" rows="5" v-model="paymentTerms"></textarea>
                    </div>
                    <div class="form-group">
                        <label for="">Условия доставки</label>
                        <textarea class="form-control" rows="5" v-model="shipmentTerms"></textarea>
                    </div>
                    <div class="form-group mb-4">
                        <label for="">Адрес склада</label>
                        <input type="text" class="form-control" v-model="warehouseAddress">
                    </div>
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text">Прайслист</span>
                        </div>
                        <div class="custom-file">
                            <input type="file" class="custom-file-input" id="inputGroupFile01" ref="file" @change="handleFile">
                            <label class="custom-file-label" for="inputGroupFile01">Выбрать</label>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="">Минимальное сумма заказа</label>
                        <input type="text" class="form-control" v-model="minSumOrder">
                    </div>
                    <div class="form-group">
                        <label for="">Время доставки</label>
                        <input type="text" class="form-control" v-model="deliveryTime">
                    </div>
                    <div class="form-group">
                        <label for="">Категории компании</label>
                        <multiselect v-model="selectedCategories" :multiple="true" :options="categories" placeholder="Выбрать" track-by="id" label="name"><span slot="noResult">Ничего не найдено</span></multiselect>
                    </div>
                    <div class="form-group text-right">
                        <button @click="updateForm" type="button" class="btn btn-outline-primary">Обновить</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
    import { get } from "../../helpers/api";
    export default {
        data(){
            return {
                company: null,
                categories: [],
                selectedCategories: [],
                shipment: false,
                pickup: false,
                description: '',
                paymentTerms: '',
                shipmentTerms: '',
                warehouseAddress: '',
                minSumOrder: '',
                deliveryTime: '',
                priceList: ''
            }
        },
        mounted() {
            this.loadCompany()
            get('/categories').then((response) => {
                if (response.status === 200){
                    this.categories = response.data.categories;
                }
            })
        },
        methods: {
            updateForm(e){
                let selectedCategoryIds = this.getSelectedCategoryIds();
                const payload = {
                    company_id: this.company.id,
                    categories: selectedCategoryIds,
                    product_shipment: this.shipment ? 1 : 0,
                    product_pickup: this.pickup ? 1 : 0,
                    description: this.description,
                    payment_terms: this.paymentTerms,
                    shipment_terms: this.shipmentTerms,
                    warehouse_address: this.warehouseAddress,
                    min_sum_order: this.minSumOrder,
                    delivery_time: this.deliveryTime,
                    price_list_url: this.priceList,
                }
                this.$store.dispatch('updaterSupplierInfo', payload)
                    .then((response) => {
                        if (response.status === 200){
                            this.flashSuccess('Успешно обновлено');
                            window.scrollTo({
                                top: 0
                            })
                        }
                    })
            },
            loadCompany(){
                this.$store.dispatch('loadSupplierInfo').then((response) => {
                    let company = response.data.company;
                    if (company.supplier_info !== null){
                        this.shipment = company.supplier_info.product_shipment == 1 ? true : false
                        this.pickup = company.supplier_info.product_pickup == 1 ? true : false
                        this.description = company.supplier_info.description,
                        this.paymentTerms = company.supplier_info.payment_terms,
                        this.shipmentTerms = company.supplier_info.shipment_terms,
                        this.warehouseAddress = company.supplier_info.warehouse_address,
                        this.minSumOrder = company.supplier_info.min_order_sum,
                        this.deliveryTime = company.supplier_info.delivery_time
                    }
                    this.selectedCategories = company.categories
                    this.company = company
                })
            },
            handleFile(e){
                this.priceList = this.$refs.file.files[0];
            },
            getSelectedCategoryIds(){
                let data = [];
                if (this.selectedCategories.length){
                    this.selectedCategories.map((item) => {
                        data.push(item.id)
                    })
                }
                return data;
            }
        }
    }
</script>
