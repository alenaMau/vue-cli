<template>
  <footer>
    <nav>
      <div v-if="!token">
        <router-link to="/authorization">Вход</router-link>
      </div>
      <router-link to="/">Главная</router-link>
      <div v-if="token">
        <router-link to="/basket">Корзина</router-link>
      </div>
      <div v-if="!token">
        |
        <router-link to="/reg">
          Регистрация
        </router-link>
      </div>
    </nav>
  </footer>
</template>

<script>
import VueCookies from "vue-cookies";
import axios from "axios";
import {thisUrl} from "@/utils/api";

export default {
  name: "Footer",

  data() {
    return {
      token: VueCookies.get('token'),
      config: {}
    }
  },
  methods: {

  }
}


</script>

<style scoped>

footer {
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