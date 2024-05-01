<template>
  <section class="authorization_box">
    <h3>Авторизация</h3>
    <div class="authorization_box_form">
      <form id="forma" @submit.prevent="onSubmit">
        <label>
          <input v-model="email" type="email" placeholder="Ваш e-mail(Обязательно)"/>
        </label>
        <span class="registry_block_form_error" v-if="errors['email']">{{errors.email}}</span>
        <label>
          <input v-model="password" class="input" type="password" placeholder="Пароль(Обязательно)"/>
        </label>
        <span class="registry_block_form_error" v-if="errors['password']">{{errors.password}}</span>
        <span class="registry_block_form_error" v-if="requestError">{{requestError}}</span>
        <button class="press_activation basket_products_decorBut" type="submit">Войти</button>
      </form>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import VueCookies from 'vue-cookies'

export default {
  name: "AuthorizationView",

  data() {
    return {
      email:"",
      password:"",
      errors:{},
      requestError:""
    }
  },
  methods: {
    onSubmit() {
      if (this.email.indexOf('@') < 0) {
        this.errors['email'] = 'Отсутвует @ в поле e-mail'
      }
      if (this.password.length === 0 || this.password.length > 30) {
        this.errors['password'] = 'Количество символов в пароле больше 30 или вообще отсутсвует'
      }
      if (Object.keys(this.errors).length === 0) {
        axios.post('https://jurapro.bhuser.ru/api-shop/login', {
          email: this.email,
          password: this.password
        }).then(response => {
          console.log('Ты авторизован')
          let token = response.data.data.user_token;
          console.log(response)
          VueCookies.set('token', token);
          window.location = '/'
        }).catch(errorResponse => {
          let errorsResponse = errorResponse.response.data.error.errors;
          Object.keys(errorsResponse).forEach(e => {
            this.errors[e] = errorsResponse[e].toString();
          })
        });
      }
    }
  }
}
</script>

<style scoped>

</style>