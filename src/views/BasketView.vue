<template>
  <section>
    <h3>Корзина</h3>
    <div class="cards">
      <div>
        <div v-if="carts.length === 0">
          <p>Корзина пуста.</p>
        </div>
        <div v-for="(cart,index) in carts" key="cart.id" class="cards_box">
          <div>
            <div>
              <span>Имя продукта: {{ cart.name }}</span><br>
              <span class="cards_description">Описание: {{ cart.description }}</span>
              <button @click="deleteProduct(cart,index)">-</button>
              <span>Количество: {{ cart.count }}</span>
              <button @click="addProduct(cart,cart.id)">+</button>
              <div>
              </div>
            </div>
          </div>
          <span>Цена: {{ cart.price * cart.count }}₽</span>
          <button @click="deleteCard(cart, index)">Удалить</button>
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
          <button v-if="carts.length > 0" @click="order()">Оплатить заказ</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import VueCookies from "vue-cookies";
import router from "@/router";
import {thisUrl} from "@/utils/api";

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
    deleteCard(cart, index) {
      let items = cart.items;
      items.push(cart.id);

      items.forEach(elem => {
        axios.delete(thisUrl()+`/cart/${elem}`, {
          headers: {Authorization: `Bearer ${this.token}`}
        }).then(response => {
          cart.count--
        })
      });
      this.carts.splice(index,1);
      this.updateCartInfo();
    },
    deleteProduct(cart,index) {
      let firstItem = cart.items.shift();
      if (!firstItem) {
        firstItem = cart.id;
      }
      axios.delete(thisUrl() + `/cart/${firstItem}`, {
        headers: {Authorization: `Bearer ${this.token}`}
      }).then(response => {
        cart.count--
        this.updateCartInfo();
        if(cart.count === 0) {
          this.carts.splice(index,1);
        }
      }).catch(error => {
        console.error(error);
      });
    },
    order() {
      axios.post(thisUrl() + '/order', {}, {
        headers: {Authorization: `Bearer ${this.token}`}
      }).then(response => {
        router.push('/orderCompleted')
      })
    },
    addProduct(cart, id) {
      axios.post(thisUrl() + `/cart/${cart.product_id}`, {
        id: id,
      }, {
        headers: {Authorization: `Bearer ${this.token}`}
      }).then(response => {
        cart.quantity++
        cart.count++
        this.updateCartInfo();
        console.log(response.data.data)
        console.log(response.data.data)
      }).catch(error => {

      })
    },
    updateCartInfo() {
      this.priceAll = this.carts.reduce((total, cart) => total + (cart.price * cart.count), 0);
      this.productsCount = this.carts.reduce((total, cart) => total + cart.count, 0);
    },
  },
  created() {
    axios.get(thisUrl() + '/cart', {
      headers: {Authorization: `Bearer ${this.token}`}
    }).then(response => {
      const fetchedCarts = response.data.data;
      const uniqueCarts = {};

      fetchedCarts.forEach(cart => {
        if (uniqueCarts[cart.product_id]) {
          uniqueCarts[cart.product_id].count++;
          uniqueCarts[cart.product_id].items.push(cart.id)
        } else {
          uniqueCarts[cart.product_id] = { ...cart, count: 1, items:[] };
        }
      });
      console.log(uniqueCarts)
      this.carts = Object.values(uniqueCarts);
      this.priceAll = this.carts.reduce((total, cart) => total + (cart.price * cart.count), 0);
      this.productsCount = this.carts.reduce((total, cart) => total + cart.count, 0);
    }).catch(error => {
      console.log("что то пошло не так",error)
    });
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


section {
  display: grid;
  justify-content: center;
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