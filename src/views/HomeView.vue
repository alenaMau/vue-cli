<template>
  <div>
    <section class="catalog">
      <h3>Каталог товаров</h3>
      <div class="catalog_item">
        <div v-for="product in products" class="catalog_item_card">
          <div class="catalog_item_imgBox">
            <img :src="imgProduct" alt="Продукт" class="catalog_item_img">
            <span>{{ product.price }}₽</span>
            <span class="catalog_item_name">{{ product.name }}</span>
            <span class="catalog_item_description">{{ product.description }}</span>
            <button v-if="this.token" @click="addProduct(product.id)">Добавить</button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import VueCookies from "vue-cookies";
import {imgProduct} from "@/assets";


export default {
  name: 'HomeView',
  data() {
    return {
      imgProduct: imgProduct,
      products: [],
      token: VueCookies.get('token'),
    }
  },
  methods: {
    addProduct(id) {
      axios.post(`https://jurapro.bhuser.ru/api-shop/cart/${id}`, {
        productId: id,
      }, {
        headers: {Authorization: `Bearer ${this.token}`}
      }).then(response => {
        console.log(response.data.data.message)
      }).catch(error => {})
    },
  },
  created() {
    console.log(this.token)
    axios.get('https://jurapro.bhuser.ru/api-shop/products', {}).then(response => {
      this.products = response.data.data;
      // console.log(response.data.data)
    })
  }
}
</script>

<style scoped>

.catalog_item_description {
  text-align: center;
  padding: 10px;
}

.catalog_item_img {
  width: 100%;
  border-radius: 20px;
  padding: 10px;
}

.catalog_item_imgBox {
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
}

.catalog_item_name {
  margin: 10px;
  text-align: center;
}

.catalog_item_info {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.catalog_item_card {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30%;
}

.catalog_item {
  display: flex;
  flex-flow: wrap;
  justify-content: center;
}
</style>
