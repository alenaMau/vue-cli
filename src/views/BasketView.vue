<template>
  <section>
    <h3>Корзина</h3>
    <div class="cards">
      <div>
        <div v-if="carts.length === 0">
          <p>Корзина пуста.</p>
        </div>
        <div v-for="(cart,index) in carts" class="cards_box">
          <div>
            <div>
              <span>Имя продукта: {{ cart.name }}</span><br>
              <span class="cards_description">Описание: {{ cart.description }}</span>
              <div>
                <button @click="decreaseCount(index)">-</button>
                <span>Количество: {{ cart.count }}</span>
                <button @click="increaseCount(index)">+</button>
              </div>
            </div>
          </div>
          <span>Цена:{{ cart.price }}₽</span>
          <button @click="deleteProduct(cart.id)">Удалить</button>
        </div>
      </div>
      <div class="order">
        <div class="order_box">
          <span>К оплате: {{ priceAll }}₽.</span>
          <span>Количество товаров: {{ productsCount }} шт.</span>
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
import router from "@/router";

export default {
  name: "BasketView",
  data() {
    return {
      token: VueCookies.get('token'),
      carts: [],
      priceAll: 0,
      productsCount: 0,
    }
  },
  methods: {
    deleteProduct(id) {
      axios.delete(`https://jurapro.bhuser.ru/api-shop/cart/${id}`, {
        headers: {Authorization: `Bearer ${this.token}`}
      }).then(response => {
        location.reload()
      })
    },
    order() {
      axios.post('https://jurapro.bhuser.ru/api-shop/order', {}, {
        headers: {Authorization: `Bearer ${this.token}`}
      }).then(response => {
        router.push({name: 'orderCompleted'})
      })
    },
    increaseCount(index) {
      this.carts[index].count++;
      this.priceAll += this.carts[index].price;
      this.productsCount++;
    },
    decreaseCount(index) {
      if (this.carts[index].count > 1) {
        this.carts[index].count--;
        this.priceAll -= this.carts[index].price;
        this.productsCount--;
      }
    }
  },
  created() {
    axios.get('https://jurapro.bhuser.ru/api-shop/cart', {
      headers: {Authorization: `Bearer ${this.token}`}
    }).then(response => {
      this.carts = response.data.data;
      console.log(response.data.data)
      console.log(this.carts)
      this.carts.forEach(el => {
        el.count = 1;
        this.priceAll += el.price;
        this.productsCount += el.count;
      })
    }).catch(error => {
    })
  }

}
</script>

<style scoped>
.cards_description {
  display: inline-block;
  width: 50%;
  margin: 10px;
}

.cards_box {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  width: 408px;
  height: fit-content;
  margin: 10px;
  padding: 10px;
  border-radius: 20px;
  border: 2px solid #bacdb8;
}

.cards {
  width: 100%;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
}


section{
  display: grid;
  justify-content: center;
  height: 85vh;
}

.order {
  margin: 40px;
  display: flex;
  justify-content: center;
  width: 30%;
  height: fit-content;
}

.order_box {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
}
</style>