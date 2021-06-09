<template>
    <div class="card mx-auto" style="max-width: 380px; margin-top:100px;">
        <div class="card-body">
            <h4 class="card-title mb-4">Вход</h4>
            <form>
                <div class="form-group">
                    <input class="form-control" @keyup="removeErrors" placeholder="Введите email" type="email" v-model="email">
                    <div class="small text-danger" v-if="emailError">{{emailError === true ? 'Поле необходимо заполнить' : emailError}}</div>
                </div>
                <div class="form-group">
                    <input class="form-control" @keypress="removeErrors" placeholder="Введите пароль" type="password" v-model="password">
                    <div class="small text-danger" v-if="passwordError">{{passwordError === true ? 'Поле необходимо заполнить' : passwordError}}</div>
                </div>
                <div class="form-group">
                    <label class="custom-control custom-checkbox">
                        <input type="checkbox" class="custom-control-input" checked="">
                        <div class="custom-control-label"> Запомнить </div>
                    </label>
                </div>
                <div class="form-group text-center">
                    <button @click.prevent="submitForm" class="btn btn-primary btn-sm"> Авторизоваться  </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
    import axios from 'axios';
    export default {
        data(){
            return {
                email: 'ai@ai.ai',
                password: 'admin',
                emailError: false,
                passwordError: false,
            }
        },
        methods: {
            removeErrors(){
                this.passwordError = false;
                this.emailError = false
            },
            submitForm(){
                if (this.email === ''){
                    this.emailError = true
                }
                if (this.password === ''){
                    this.passwordError = true
                }
                if (!this.emailError || !this.passwordError){
                    this.$store.commit('setLoading', true)
                    axios.post('/api/login', {
                        'email': this.email,
                        'password': this.password,
                    }).then((response) => {
                        this.$store.commit('setLoading', false)
                        let data = response.data
                        if (response.status === 200 && data.success === true){
                            this.$store.dispatch('authInit', data)
                            this.flashSuccess('Успешно авторизовались')
                            this.$router.push({
                                name: 'home'
                            });
                        }else if (response.status === 200 && data.success === false){
                            for (let item in data.errors){
                                if (item == 'email'){
                                    if (data.validated === true){
                                        this.emailError = data.errors[item]
                                    }else{
                                        this.emailError = data.errors[item][0]
                                    }
                                }
                                if (item == 'password'){
                                    this.passwordError = data.errors[item][0]
                                }
                            }
                        }
                        this.$store.commit('setLoading', false)
                    })
                }
            }
        }
    }
</script>
