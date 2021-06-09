<template>
    <transition name="modal">
        <div class="modal show fade" style="display: block">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <slot></slot>
                </div>
            </div>
            <div class="modal-backdrop"></div>
        </div>
    </transition>
</template>
<script>
    export default {
    }
</script>
<style>
    .modal-backdrop{
        position: absolute;
    }
    .modal .modal-backdrop {
        opacity: .5;
    }
    .modal-dialog{
        z-index: 99999;
    }
</style>
