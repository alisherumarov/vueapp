<template>
    <div>
        <article class="card mb-3">
            <div class="card-body">
                <figure class="icontext">
                    <div class="icon">
                        <img class="rounded-circle img-sm border" width="100" height="100" src="https://loremflickr.com/320/240/dog">
                    </div>
                    <div class="text">
                        <div><strong>{{user.firstName + ' ' + user.lastName}}</strong></div>
                        <span>{{user.email}}</span> <br>
                        <a href="#" @click.prevent="editUser">Изменить</a>
                    </div>
                </figure>
                <hr>
                <p>
                    <i class="fa fa-map-marker text-muted"></i> &nbsp;
                    Адрес доставки:
                    <br> {{company.delivery_address}}
                    <a href="#" class="btn-link"> Изменить</a>
                </p>
                <article class="card-group">
                    <figure class="card bg">
                        <div class="p-3">
                            <h5 class="card-title">0</h5>
                            <span>Мои заказы</span>
                        </div>
                    </figure>
                    <figure class="card bg">
                        <div class="p-3">
                            <h5 class="card-title">0</h5>
                            <span>Избранные</span>
                        </div>
                    </figure>
                    <figure class="card bg">
                        <div class="p-3">
                            <h5 class="card-title">0</h5>
                            <span>Мои товары</span>
                        </div>
                    </figure>
                </article>


            </div> <!-- card-body .// -->
        </article>
        <Modal v-if="modalShow">
            <template>
                <div class="modal-header">
                    <h5 class="modal-title">Изменить Пользователя</h5>
                    <button type="button" @click.prevent="closeModal" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label for="">Имя</label>
                        <input type="text" class="form-control form-control-sm" v-model="user.firstName">
                    </div>
                    <div class="form-group">
                        <label for="">Фамилия</label>
                        <input type="text" class="form-control form-control-sm" v-model="user.lastName">
                    </div>
                    <div class="form-group">
                        <label for="">Номер телефона</label>
                        <input type="text" class="form-control form-control-sm" v-model="user.phone">
                    </div>
                </div>
                <div class="modal-footer">
                    <button @click.prevent="closeModal" type="button" class="btn btn-secondary" data-dismiss="modal">Отмена</button>
                    <button @click="updateUser" type="button" class="btn btn-primary">Обновить</button>
                </div>
            </template>
        </Modal>
    </div>
</template>
<script>
    import Modal from './../../components/Modal'
    import {get} from "../../helpers/api";
    export default {
        data(){
            return {
                modalShow: false,
                user: {
                    email: '',
                    firstName: '',
                    lastName: '',
                    phone: '',
                },
                company: ''
            }
        },
        methods: {
            editUser(){
                this.modalShow = true
            },
            closeModal(){
                this.modalShow = false
            },
            updateUser(){
                const user = {
                    first_name: this.user.firstName,
                    last_name: this.user.lastName,
                    phone: this.user.phone,
                }
                this.$store.dispatch('updateCurrentUser', user)
                    .then((response) => {
                        if (response.status === 200){
                            this.modalShow = false
                            this.flashSuccess('Успешно обновлено')
                        }
                    })
            }
        },
        mounted() {
            get('/user')
                .then((response) => {
                    let data = response.data;
                    this.user.email = data.user.email;
                    this.user.firstName = data.user.first_name;
                    this.user.lastName = data.user.last_name;
                    this.user.phone = data.user.phone;
                    this.$store.commit('setUserObj', data.user)
                })

            this.$store.dispatch('loadSupplierInfo').then((response) => {
                this.company = this.$store.getters.getCurrentCompany
            })
        },
        components: { Modal }
    }
</script>
