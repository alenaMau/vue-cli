<template>
  <section>
    <h3>Авторизация</h3>
    <div class="authorization_box">
      <form @submit.prevent="onSubmit">
        <label>
          <input v-model="email" type="email" placeholder="Ваш e-mail(Обязательно)"/>
        </label>
        <span v-if="errors['email']">{{errors.email}}</span>
        <label>
          <input v-model="password" type="password" placeholder="Пароль(Обязательно)"/>
        </label>
        <span v-if="errors['password']">{{errors.password}}</span>
        <span v-if="requestError">{{requestError}}</span>
        <button type="submit">Войти</button>
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

section {
  display: flex;
  justify-content: center;
  max-width: 100%;
  flex-direction: column;
  height: 1141px;
  align-items: center;
}

.authorization_box {
  width: 558px;
  height: 248px;
  padding: 25px;
  flex-shrink: 0;
  border-radius: 15px;
  border: 2px solid #42b983;
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: center;
  justify-content: center;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

input {
  padding: 10px;
  border-radius: 10px;
  border: rgba(204, 247, 225, 0.83) 2px solid;
}

</style>