<template>
    <aside class="col-md-3">
        <div class="card">
            <div class="card-header"> Категории </div>
            <div class="card-body">
                <ul class="list-group list-group-flush">
                    <li v-for="item in categories" class="list-group-item d-flex justify-content-between align-items-center">
                        <span @click="selectedCategory(item)" class="cat_name">{{item.name}}</span>
                        <i v-if="item.children.length" @click.prevent="openSubCategory(item, $event)" class="fa text-muted fa-angle-down" aria-hidden="true"></i>
                    </li>
                </ul>
                <ul v-if="subCategories.children" class="child_menu shadow-sm border card list-group list-group-flush">
                    <li @click="selectedCategory(item)" v-for="item in subCategories.children" class="list-group-item d-flex justify-content-between align-items-center pl-3">{{item.name}}</li>
                </ul>
            </div>
        </div>

<!--        <div class="card">-->
<!--            <article class="filter-group">-->
<!--                <header class="card-header">-->
<!--                    <h6 class="title">Product type</h6>-->
<!--                </header>-->
<!--                <div class="filter-content">-->
<!--                    <div class="card-body">-->
<!--                        <ul class="list-group list-group-flush">-->
<!--                            <li class="list-group-item d-flex justify-content-between align-items-center">-->
<!--                                Cras justo odio <span class="badge badge-light badge-pill">14</span>-->
<!--                            </li>-->
<!--                            <li class="list-group-item d-flex justify-content-between align-items-center">-->
<!--                                Dapibus ac facilisis in <span class="badge badge-light badge-pill">2</span>-->
<!--                            </li>-->
<!--                            <li class="list-group-item d-flex justify-content-between align-items-center">-->
<!--                                Morbi leo risus <span class="badge badge-light badge-pill">1</span>-->
<!--                            </li>-->
<!--                        </ul>-->
<!--                    </div> &lt;!&ndash; card-body.// &ndash;&gt;-->
<!--                </div>-->
<!--            </article> &lt;!&ndash; filter-group  .// &ndash;&gt;-->
<!--            <article class="filter-group">-->
<!--                <header class="card-header">-->
<!--                    <h6 class="title">Brands </h6>-->
<!--                </header>-->
<!--                <div class="filter-content">-->
<!--                    <div class="card-body">-->
<!--                        <label class="custom-control custom-checkbox">-->
<!--                            <input type="checkbox" checked="" class="custom-control-input">-->
<!--                            <div class="custom-control-label">Mercedes-->
<!--                                <b class="badge badge-pill badge-light float-right">120</b>  </div>-->
<!--                        </label>-->
<!--                        <label class="custom-control custom-checkbox">-->
<!--                            <input type="checkbox" checked="" class="custom-control-input">-->
<!--                            <div class="custom-control-label">Toyota-->
<!--                                <b class="badge badge-pill badge-light float-right">15</b>  </div>-->
<!--                        </label>-->
<!--                        <label class="custom-control custom-checkbox">-->
<!--                            <input type="checkbox" checked="" class="custom-control-input">-->
<!--                            <div class="custom-control-label">Mitsubishi-->
<!--                                <b class="badge badge-pill badge-light float-right">35</b> </div>-->
<!--                        </label>-->
<!--                        <label class="custom-control custom-checkbox">-->
<!--                            <input type="checkbox" checked="" class="custom-control-input">-->
<!--                            <div class="custom-control-label">Nissan-->
<!--                                <b class="badge badge-pill badge-light float-right">89</b> </div>-->
<!--                        </label>-->
<!--                        <label class="custom-control custom-checkbox">-->
<!--                            <input type="checkbox" class="custom-control-input">-->
<!--                            <div class="custom-control-label">Honda-->
<!--                                <b class="badge badge-pill badge-light float-right">30</b>  </div>-->
<!--                        </label>-->
<!--                    </div> &lt;!&ndash; card-body.// &ndash;&gt;-->
<!--                </div>-->
<!--            </article> &lt;!&ndash; filter-group .// &ndash;&gt;-->
<!--            <article class="filter-group">-->
<!--                <header class="card-header">-->
<!--                    <h6 class="title">Price range </h6>-->
<!--                </header>-->
<!--                <div class="filter-content">-->
<!--                    <div class="card-body">-->
<!--                        <input type="range" class="custom-range" min="0" max="100" name="">-->
<!--                        <div class="form-row">-->
<!--                            <div class="form-group col-md-6">-->
<!--                                <label>Min</label>-->
<!--                                <input class="form-control" placeholder="$0" type="number">-->
<!--                            </div>-->
<!--                            <div class="form-group text-right col-md-6">-->
<!--                                <label>Max</label>-->
<!--                                <input class="form-control" placeholder="$1,0000" type="number">-->
<!--                            </div>-->
<!--                        </div> &lt;!&ndash; form-row.// &ndash;&gt;-->
<!--                        <button class="btn btn-block btn-primary">Apply</button>-->
<!--                    </div>&lt;!&ndash; card-body.// &ndash;&gt;-->
<!--                </div>-->
<!--            </article> &lt;!&ndash; filter-group .// &ndash;&gt;-->
<!--            <article class="filter-group">-->
<!--                <header class="card-header">-->
<!--                    <h6 class="title">Sizes </h6>-->
<!--                </header>-->
<!--                <div class="filter-content">-->
<!--                    <div class="card-body">-->
<!--                        <label class="checkbox-btn">-->
<!--                            <input type="checkbox">-->
<!--                            <span class="btn btn-light"> XS </span>-->
<!--                        </label>-->

<!--                        <label class="checkbox-btn">-->
<!--                            <input type="checkbox">-->
<!--                            <span class="btn btn-light"> SM </span>-->
<!--                        </label>-->

<!--                        <label class="checkbox-btn">-->
<!--                            <input type="checkbox">-->
<!--                            <span class="btn btn-light"> LG </span>-->
<!--                        </label>-->

<!--                        <label class="checkbox-btn">-->
<!--                            <input type="checkbox">-->
<!--                            <span class="btn btn-light"> XXL </span>-->
<!--                        </label>-->
<!--                    </div>&lt;!&ndash; card-body.// &ndash;&gt;-->
<!--                </div>-->
<!--            </article> &lt;!&ndash; filter-group .// &ndash;&gt;-->
<!--            <article class="filter-group">-->
<!--                <header class="card-header">-->
<!--                    <h6 class="title">More filter </h6>-->
<!--                </header>-->
<!--                <div class="filter-content">-->
<!--                    <div class="card-body">-->
<!--                        <label class="custom-control custom-radio">-->
<!--                            <input type="radio" name="myfilter_radio" checked="" class="custom-control-input">-->
<!--                            <div class="custom-control-label">Any condition</div>-->
<!--                        </label>-->

<!--                        <label class="custom-control custom-radio">-->
<!--                            <input type="radio" name="myfilter_radio" class="custom-control-input">-->
<!--                            <div class="custom-control-label">Brand new </div>-->
<!--                        </label>-->

<!--                        <label class="custom-control custom-radio">-->
<!--                            <input type="radio" name="myfilter_radio" class="custom-control-input">-->
<!--                            <div class="custom-control-label">Used items</div>-->
<!--                        </label>-->

<!--                        <label class="custom-control custom-radio">-->
<!--                            <input type="radio" name="myfilter_radio" class="custom-control-input">-->
<!--                            <div class="custom-control-label">Very old</div>-->
<!--                        </label>-->
<!--                    </div>&lt;!&ndash; card-body.// &ndash;&gt;-->
<!--                </div>-->
<!--            </article> &lt;!&ndash; filter-group .// &ndash;&gt;-->
<!--        </div> &lt;!&ndash; card.// &ndash;&gt;-->

    </aside>
</template>

<script>
    export default {
        data(){
          return {
              categories: [],
              subCategories: [],
              prevActive: ''
          }
        },
        mounted() {
            this.$store.dispatch('loadCategories').then((response) => {
                this.categories = response.data.categories
            })
        },
        methods: {
            openSubCategory(item, event){
                if (this.subCategories.children && item.id !== this.subCategories.id) {
                    this.prevActive.target.className = "fa text-muted fa-angle-down";
                    this.prevActive = event;
                    this.subCategories = item
                    event.target.className = "fa fa-angle-right text-warning";
                }else if(this.subCategories.children && (item.id === this.subCategories.id)){
                    this.subCategories = [];
                    this.prevActive.target.className = "fa text-muted fa-angle-down";
                }else{
                    this.prevActive = event;
                    event.target.className = "fa fa-angle-right text-warning";
                    this.subCategories = item
                }
            },
            clickOutside(e) {
                if (e.target.className !== undefined){
                    if (!this.$el.contains(e.target)) {
                        this.subCategories = [];
                        if (this.prevActive !== ''){
                            this.prevActive.target.className = 'fa text-muted fa-angle-down';
                            this.prevActive = '';
                        }
                    }
                }
            },
            selectedCategory(item){
                this.$store.dispatch('filterProducts', item.id)
                this.subCategories = []
                this.prevActive.target.className = 'fa text-muted fa-angle-down';
                this.prevActive = ''
            }
        },
        created() {
            document.addEventListener('click', this.clickOutside);
            this.$on('hook:beforeDestroy', () => document.removeEventListener('click', this.clickOutside));
        },
    }
</script>
<style scoped>
    .title{
        margin-bottom: 0;
    }
    .list-group-item{
        padding-left: 0;
        padding-right: 0;
        position: relative;
    }
    .cat_name{
        cursor: pointer;
    }
    .list-group-item:hover{
        color: #007bff;
    }
    .child_menu{
        position: absolute;
        left: 100%;
        z-index: 9999999;
        background: white;
        right: 0;
        width: 100%;
        top: 0;
        bottom: 0;
        margin: 0;
    }
    .list-group-item i{
        cursor: pointer;
    }
</style>
