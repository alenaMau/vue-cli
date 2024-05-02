<template>
  <header>
    <nav>
    <div v-if="token" @click="logout()">
      <a>Выход</a>
    </div>
    <div v-if="!token">
      |
      <router-link to="/authorization">Вход</router-link>
    </div>
      |
      <router-link to="/">Главная</router-link>
      <div v-if="token">
        |
        <router-link to="/basket">Корзина</router-link>
      </div>
      <div v-if="!token">
        |
        <router-link to="/reg">
          Регистрация
        </router-link>
      </div>
    </nav>
  </header>
</template>

<script>
import {imgProduct} from "@/assets";
import VueCookies from "vue-cookies";
import axios from "axios";
import {thisUrl} from "@/utils/api";

export default {
  name: "Header",

  data() {
    return {
      token: VueCookies.get('token'),
      config: {}
    }
  },
  methods: {
    logout() {
      const config = {
        headers: {Authorization: `Bearer ${this.token}`}
      };
      axios.get(thisUrl()+'/logout', config).then(response => {
        if (response.data.data.message === 'logout') {
          VueCookies.remove('token')
          window.location = '/'
        }
      }).catch(error => {
      });
    }
  }
}


</script>

<style scoped>

header {
  display: flex;
}

nav {
  padding: 30px;
  display: flex;
  flex-direction: row;
}

nav a span  {
  padding: 10px;
  font-weight: bold;
  color: #2c3e50;
}

nav a span.router-link-exact-active {
  padding: 10px;
  color: #42b983;
}

</style>