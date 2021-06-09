<template>
        <div class="row">
            <Sidebar />
            <div class="col-9">
                <CatalogHeader />
                <Products />
            </div>
        </div>
</template>

<script>
    import Sidebar from "../components/Sidebar";
    import Products from "./Products";
    import CatalogHeader from "../components/CatalogHeader";
    import store from "../store";
    export default {
        mounted() {

        },
        components: {Sidebar, CatalogHeader, Products}
    }
</script>
