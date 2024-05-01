<template>
  <div class="home">
    <section class="catalog_item">
      <h3>Каталог товаров</h3>
      <div>
        <div v-for="product in products">
          <div class="catalog_item_imgBox">
            <span>{{product.price}}₽</span>
          </div>
          <span class="catalog_item_name">{{product.name}}</span>
          <button v-if="this.token" class="catalog_item_button press_activation" @click="addToBasket(product.id)">Добавить</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import VueCookies from "vue-cookies";


export default {
  name: 'HomeView',
  data() {
    return {
      products: [],
      token:VueCookies.get('token'),
    }
  },
  methods: {

  },
  created() {
    axios.get('https://jurapro.bhuser.ru/api-shop/products', {
    }).then(response => {
      this.products = response.data.data;
    })
    let addToBasket = (id) => {
      axios.post(`https://jurapro.bhuser.ru/api-shop/cart/${id}`, {
        product_id: id,
      }, {
        headers: { Authorization: `Bearer ${this.token}` }
      }).then(response => {
        console.log(response.data.data.message)
      }).catch(error => {});
    }
  }
}
</script>
