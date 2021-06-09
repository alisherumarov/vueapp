<template>
    <div class="card">
        <div class="card-header d-flex justify-content-between align-items-center">
            <h6 class="mb-0">Новый товар</h6>
            <router-link to="/profile/products" class="btn btn-sm btn-outline-primary"> Назад в каталог </router-link>
        </div>
        <div class="card-body">
            <div class="row">
                <div class="col-6">
                    <div class="form-group">
                        <label for="">Название <sup class="text-danger">*</sup></label>
                        <input type="text" v-model="title" :class="errors.title ? 'border border-danger' : ''" class="form-control form-control-sm">
                        <i class="text-danger small" v-if="errors.title" v-text="errors.title"></i>
                    </div>
                    <div class="form-group">
                        <label for="">Цена(за упаковку) <sup class="text-danger">*</sup></label>
                        <input type="text" v-model="priceForPack" class="form-control form-control-sm">
                    </div>
                    <div class="form-group">
                        <label for="">Кол-во на складе <sup class="text-danger">*</sup></label>
                        <input type="text" v-model="qty" :class="errors.qty ? 'border border-danger' : ''" class="form-control form-control-sm">
                        <i class="text-danger small" v-if="errors.qty" v-text="errors.qty"></i>
                    </div>
                    <div class="form-group">
                        <label for="">Скидка в %</label>
                        <input type="text" v-model="discount" class="form-control form-control-sm">
                    </div>
                    <div class="form-group">
                        <label for="">Категория <sup class="text-danger">*</sup></label>
                        <multiselect v-model="category" :options="categoryOptions" :class="errors.category ? 'border border-danger' : ''" placeholder="Выберите" track-by="id" label="name"><span slot="noResult">К сожалению! Элементы не найдены</span></multiselect>
                        <i class="text-danger small" v-if="errors.category" v-text="errors.category"></i>
                    </div>
                    <div class="form-group">
                        <label for="">Единица измерения <sup class="text-danger">*</sup> </label>
                        <multiselect v-model="measure" :options="measureOptions" placeholder="Выберите" track-by="id" label="name"><span slot="noResult">К сожалению! Элементы не найдены</span></multiselect>
                    </div>
                    <div class="form-group d-flex m-0 justify-content-center flex-column" style="height: 160px">
                        <div class="form-check">
                            <input type="checkbox" v-model="draft" id="exampleCheck1" class="form-check-input">
                            <label for="exampleCheck1" class="form-check-label">Черновик</label>
                        </div>
                        <div class="form-check mt-2 mb-2">
                            <input type="checkbox" v-model="options" id="exampleCheck2" class="form-check-input">
                            <label for="exampleCheck2" class="form-check-label">Включить характеристики</label>
                        </div>
                        <div class="form-check">
                            <input type="checkbox" v-model="tiunStatus" id="exampleCheck3" class="form-check-input">
                            <label for="exampleCheck3" class="form-check-label">Включить код товара</label>
                        </div>
                    </div>
                </div>
                <div class="col-6">
                    <div class="form-group">
                        <label for="">СКУ <sup class="text-danger">*</sup></label>
                        <input type="text" :class="errors.sku ? 'border border-danger' : ''" v-model="sku" class="form-control form-control-sm">
                        <i class="text-danger small" v-if="errors.sku" v-text="errors.sku"></i>
                    </div>
                    <div class="form-group">
                        <label for="">Артикул <sup class="text-danger">*</sup></label>
                        <input type="text" v-model="artikul" class="form-control form-control-sm">
                    </div>
                    <div class="form-group">
                        <label for="">Кол-во в упаковке </label>
                        <input type="text" v-model="qtyInPack" class="form-control form-control-sm">
                    </div>
                    <div class="form-group">
                        <label for="">Гарантия (в месяцах)</label>
                        <input type="text" v-model="warranty" class="form-control form-control-sm">
                    </div>
                    <div class="form-group">
                        <label for="">НДС</label>
                        <multiselect v-model="vat" :options="vatOptions" placeholder="Без НДС" track-by="key" label="value"><span slot="noResult">К сожалению! Элементы не найдены</span></multiselect>
                    </div>
                    <div class="form-group">
                        <label for="">Теги </label>
                        <multiselect v-model="tags" :options="tagOptions" :multiple="true" placeholder="Выберите" track-by="id" label="name"><span slot="noResult">К сожалению! Элементы не найдены</span></multiselect>
                    </div>
                    <div class="form-group d-flex justify-content-center">
                        <vue-upload-multiple-image
                            ref="images"
                            @upload-success="uploadImageSuccess"
                            @before-remove="beforeRemove"
                            drag-text="Перетащите изображения или нажмите выбрать"
                            browse-text="Выбрать"
                            primary-text="По умолчанию"
                            mark-is-primary-text="Установить по умолчанию"
                            popup-text="Это изображение будет отображаться по умолчанию"
                            drop-text="Оставьте свои файлы здесь ..."
                        ></vue-upload-multiple-image>
                    </div>
                </div>
            </div>
            <ul class="list-group" v-if="options">
                <li class="list-group-item" v-for="(item, index) in productOptions">
                    <div class="row align-items-center">
                        <div class="col-5">
                            <div class="form-group">
                                <label for="">Название характеристики <sup class="text-danger">*</sup></label>
                                <multiselect  v-model="productOptions[index].title" group-values="features" group-label="name" :options="featureOptions" placeholder="Выберите" track-by="id" label="name"><span slot="noResult">К сожалению! Элементы не найдены</span></multiselect>
                            </div>
                        </div>
                        <div class="col-5">
                            <div class="form-group">
                                <label for="">Значение характеристики <sup class="text-danger">*</sup></label>
                                <input type="text" class="form-control" v-model="productOptions[index].value">
                            </div>
                        </div>
                        <div class="col-2">
                            <div class="btn-group mt-3" role="group" aria-label="Basic example">
                                <button v-if="index >= 1" type="button" @click="removeInputItem(index, 'productOptions')" class="btn btn-danger">
                                    <div style="width:20px">-</div>
                                </button>
                                <button type="button" @click="addInputItem('productOptions')" class="btn btn-success">
                                    <div style="width:20px">+</div>
                                </button>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
            <ul class="list-group mt-3" v-if="tiunStatus">
                <li class="list-group-item" v-for="(item, index) in tiuns">
                    <div class="row align-items-center">
                        <div class="col-5">
                            <div class="form-group">
                                <label for="">Код <sup class="text-danger">*</sup></label>
                                <input type="text" class="form-control form-control-sm" v-model="tiuns[index].title">
                            </div>
                        </div>
                        <div class="col-5">
                            <div class="form-group">
                                <label for="">Значение <sup class="text-danger">*</sup></label>
                                <input type="text" class="form-control form-control-sm" v-model="tiuns[index].value">
                            </div>
                        </div>
                        <div class="col-2">
                            <div class="btn-group mt-3" role="group" aria-label="Basic example">
                                <button v-if="index >= 1" type="button" @click="removeInputItem(index, 'tiuns')" class="btn btn-danger">
                                    <div style="width:20px">-</div>
                                </button>
                                <button type="button" @click="addInputItem('tiuns')" class="btn btn-success">
                                    <div style="width:20px">+</div>
                                </button>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
            <div class="row">
                <div class="col-12">
                    <div class="form-group border-top mt-4 pt-3">
                        <label for="">Краткое описание <sup class="text-danger">*</sup></label>
                        <textarea rows="5" v-model="description" class="form-control" :class="errors.description ? 'border border-danger' : ''" placeholder="Введите..."></textarea>
                        <i class="text-danger small" v-text="errors.description" v-if="errors.description"></i>
                    </div>
                </div>
            </div>
            <div class="form-group text-right">
                <button @click="saveProduct" class="btn btn-outline-primary">Создать</button>
            </div>
        </div>
    </div>
</template>
<script>
    import { required, minLength } from 'vuelidate/lib/validators'
    import VueUploadMultipleImage from 'vue-upload-multiple-image'
    import { get, post } from '../../helpers/api'

    export default {
        data() {
            return {
                vatOptions: [
                    {
                        key: '',
                        value: 'Без НДС',
                    },
                    {
                        key: '0',
                        value: '0%',
                    },
                    {
                        key: 15,
                        value: '15%',
                    },
                    {
                        key: 20,
                        value: '20%',
                    }
                ],
                tagOptions: [],
                measureOptions: [],
                categoryOptions: [],
                featureOptions: [],
                options: false,
                tiunStatus: false,
                title: '',
                description: '',
                sku: '',
                qty: '',
                vat: '',
                draft: '',
                tags: [],
                images: [],
                artikul: '',
                qtyInPack: '',
                discount: '',
                warranty: '',
                category: '',
                measure: '',
                priceForPack: '',
                productOptions: [
                    {
                        title: '',
                        value: '',
                    }
                ],
                tiuns: [
                    {
                        title: '',
                        value: '',
                    }
                ],
                errors: {
                    title: false,
                    description: false,
                    sku: false,
                    qty: false,
                    category: false,
                    measure: false
                }
            }
        },
        mounted() {
            get('/categories').then((response) => {
                if (response.data.success === true){
                    this.categoryOptions = response.data.categories
                }
            })
            get('/measures').then((response) => {
                if (response.data.success === true) {
                    this.measureOptions = response.data.measures
                }
            })
            get('/tags').then((response) => {
                if (response.data.success === true) {
                    this.tagOptions = response.data.tags
                }
            })
            get('/features').then((response) => {
                if (response.data.success === true) {
                    this.featureOptions = response.data.features
                }
            })
        },
        methods: {
            addInputItem(type){
                this[type].push({
                    title: '',
                    value: ''
                })
            },
            removeInputItem(index, type){
                if (this[type].length > 1){
                    this[type] = this[type].filter((value, key) => {
                        return key !== index;
                    })
                }
            },
            saveProduct(){
                let product = {
                    title: this.title,
                    description: this.description,
                    sku: this.sku,
                    qty: this.qty,
                    vat: this.vat,
                    draft: this.draft,
                    tags: this.tags,
                    images: this.images,
                    artikul: this.artikul,
                    qtyInPack: this.qtyInPack,
                    discount: this.discount,
                    warranty: this.warranty,
                    category: this.category,
                    measure: this.measure,
                    price: this.priceForPack,
                    productOptions: this.productOptions,
                    tiuns: this.tiuns,
                }
                post('/products', product).then((response) => {
                    if (response.data.success){
                        this.flashSuccess('Success!');
                        this.$router.push('/profile/products')
                        window.scrollTo({top: 0})
                    }else{
                        if (response.data.errors !== undefined){
                            for (let item in response.data.errors){
                                this.errors[item] = response.data.errors[item][0]
                            }
                        }
                    }
                })
            },
            uploadImageSuccess(formData, index, fileList) {
                this.images = fileList
            },
            beforeRemove (index, done, fileList) {
                if (confirm("remove image") == true) return done()
            }
        },
        validations: {
            title: {
                required,
                minLength: minLength(4)
            },
            description: {
                required,
            }
        },
        components: {
            VueUploadMultipleImage
        }
    }
</script>
<style>
    #my-strictly-unique-vue-upload-multiple-image {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
