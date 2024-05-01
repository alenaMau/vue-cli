<template>
  <section>
    <h3>Корзина</h3>
    <div>
      <div>
        <div v-for="cart in carts">
          <div>
            <div>
              <span>{{cart.name}}</span>
              <h5>Описание: {{cart.description}}</h5>
              <div>
                <button>-</button>
                <span>{{ cart.count }}</span>
                <button>+</button>
              </div>
            </div>
          </div>
          <span>{{cart.price}}₽</span>
          <button @click="deleteProduct(cart.id)">Удалить</button>
        </div>
      </div>
      <div>
        <div>
          <span>К оплате: {{ priceAll }}₽.</span>
          <span>Количество товаров: {{productsCount}} шт.</span>
          <span>Доставка: Бесплатно.</span>
          <span>Адрес:Город Томск,XXXXXXXXXXXXXXXX.</span>
          <span>Оплата: Картой.</span>
          <span>Visa :795443******9832 09/25.</span>
          <button @click="order()">Оплатить заказ</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import VueCookies from "vue-cookies";

export default {
  name: "BasketView",
  data() {
    return {
      token: VueCookies.get('token'),
      carts:[],
      priceAll:0,
      productsCount:0,
    }
  },
  methods: {
    deleteProduct(id) {
      axios.delete(`https://jurapro.bhuser.ru/api-shop/cart/${id}`, {
        headers: { Authorization: `Bearer ${this.token}` }
      }).then(response => {
        location.reload()
      })
    },
    order() {
      axios.post('https://jurapro.bhuser.ru/api-shop/order', {}, {
        headers: { Authorization: `Bearer ${this.token}` }
      }).then(response => {
        console.log(asd)
      })
    }
  },
  created() {
    axios.get('https://jurapro.bhuser.ru/api-shop/cart', {
      headers: { Authorization: `Bearer ${this.token}` }
    }).then(response => {
      this.carts = response.data.data;
      console.log(this.carts)
      this.carts.forEach(el => {
        el.count = 1;
        this.priceAll += el.price;
        this.productsCount += el.count;
      })
    }).catch(error => {})
  }

}
</script>

<style scoped>

</style>