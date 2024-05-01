<template>
  <header>
    <div class="header_icon_shoppingCart press_activation" v-if="token" @click="logout()">
      <div class="header_imgIcon_out"></div>
      <span class="header_nameIcon_completedOrders">Выход</span>
    </div>
    <div class="header_icon_shoppingCart press_activation" v-if="!token">
      <div class="header_imgIcon_user"></div>
      <router-link :to="{name: 'reg'}">
        Регистрация
      </router-link>
    </div>
    <div class="header_icon_shoppingCart press_activation" v-if="!token">
      <div class="header_imgIcon_authorization"></div>
      <router-link :to="{ name: 'authorization' }"  class="header_nameIcon_authorization">
        Вход
      </router-link>
    </div>
  </header>
</template>

<script>
import {imgProduct} from "@/assets";
import VueCookies from "vue-cookies";
import axios from "axios";

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
      axios.get('https://jurapro.bhuser.ru/api-shop/logout', config).then(response => {
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

}

</style>