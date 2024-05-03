<template>
  <section>
    <h3>Регистрация</h3>
    <div class="registry_box">
      <form @submit.prevent="onSubmit">
        <label>
          <input v-model="name" type="text" placeholder="Ваше имя(Обязательно)" @focus="clearError('name')"/>
        </label>
        <span v-if="errors['name']">{{ errors.name }}</span>
        <label>
          <input v-model="surname" type="text" placeholder="Ваша Фамилия(Обязательно)" @focus="clearError('surname')"/>
        </label>
        <span v-if="errors['surname']">{{ errors.surname }}</span>
        <label>
          <input v-model="patronymic" type="text" placeholder="Ваше Отчество(Обязательно)" @focus="clearError('patronymic')"/>
        </label>
        <span v-if="errors['patronymic']">{{ errors.patronymic }}</span>
        <label>
          <input v-model="email" type="email" placeholder="Ваш e-mail(Обязательно)" @focus="clearError('email')"/>
        </label>
        <span v-if="errors['email']">{{ errors.email }}</span>
        <label>
          <input v-model="password" class="input" type="password" placeholder="Пароль(Обязательно)" @focus="clearError('password')"/>
        </label>
        <span v-if="errors['password']">{{ errors.password }}</span>
        <label>
          <input v-model="repeatPassword" class="input" type="password" placeholder="Повторение пароля(Обязательно)" @focus="clearError('repeatPassword')"/>
        </label>
        <span v-if="errors['repeat_password']" @focus="clearError('repeatPassword')">{{ errors.repeat_password }}</span>
        <span v-if="errors['wrong_repeat']" @focus="clearError('wrong_repeat')">{{ errors.wrong_repeat }}</span>
        <button type="submit">Зарегистрироваться</button>
      </form>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import {thisUrl} from "@/utils/api";
import router from "@/router";
import AuthorizationView from "@/views/AuthorizationView";
export default {
  name: "Registration",

  data() {
    return {
      name: "",
      surname: "",
      patronymic: "",
      email: "",
      password: "",
      repeatPassword: "",
      errors: {}
    }
  },
  methods: {
    clearError(field) {
      if (this.errors[field]) {
        this.errors[field] = '';
      }
    },
    onSubmit() {
      let fio = this.name + ' ' + this.surname + ' ' + this.patronymic
      if (this.name.length === 0 || this.name.length > 30) {
        this.errors['name'] = 'Количество символов в имени больше 30 или вообще отсутсвуют'
      }
      if (this.surname.length === 0 || this.surname.length > 30) {
        this.errors['surname'] = 'Количество символов в фамилии больше 30 или вообще отсутсвуют'
      }
      if (this.patronymic.length === 0 || this.patronymic.length > 30) {
        this.errors['patronymic'] = 'Количество символов в отчестве больше 30 или вообще отсутсвуют'
      }
      if (this.email.length === 0 || this.email.length > 30) {
        this.errors['email'] = 'Количество символов в отчестве больше 30 или вообще отсутсвуют'
      }
      if (this.email.indexOf('@') < 0) {
        this.errors['email'] = 'Отсутвует @ в поле e-mail'
      }
      if (this.password.length === 0 || this.password.length > 30) {
        this.errors['password'] = 'Количество символов в пароле больше 30 или вообще отсутсвует'
      }
      if (this.repeatPassword.length === 0 || this.repeatPassword.length > 30) {
        this.errors['repeat_password'] = 'Количество символов в пароле больше 30 или вообще отсутсвует'
      }
      if (this.password !== this.repeatPassword) {
        this.errors['wrong_repeat'] = 'Пароли не совпадают'
      }
      if (Object.keys(this.errors).length === 0) {
        axios.post(thisUrl()+'/signup', {
          fio: fio,
          email: this.email,
          password: this.password
        }).then(response => {
          console.log('Ты зареган')
          router.push('/authorization')
        }).catch(errorResponse => {
          console.log("cccc")
          let errorsResponse = errorResponse.response.data.error.errors;
          console.log(errorsResponse)
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
.registry_box {
  width: 558px;
  height: fit-content;
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