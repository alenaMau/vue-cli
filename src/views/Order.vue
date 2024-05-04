<template>
  <section>
    <div v-for="order in orders" :key="order.id" class="order">
      <div><p>Order №{{ order.id }}</p></div>
      <span>Products: {{ order.products.length }}</span>
      <p>Total cost: {{ order.order_price }}rub.</p>
    </div>
  </section>
</template>

<script>
import { thisUrl } from "@/utils/api";
import axios from "axios";
import VueCookies from "vue-cookies";

export default {
  name: "Order",

  data() {
    return {
      orders: [],
      token: VueCookies.get('token')
    }
  },
  methods: {
    async conclusionOrders() {
      try {
        const response = await axios.get(thisUrl() + "/order", {
          headers: { Authorization: `Bearer ${this.token}` }
        });
        console.log(response.data)
        this.orders = response.data.data;
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    }
  },
  created() {
    this.conclusionOrders();
  }
}
</script>

<style scoped>
section {
  display: grid;
  justify-content: center;
}

.order {
  margin: 15px;
  width: 80%;
  padding: 20px;
  border-radius: 10px;
  border: #42b983 2px solid;
}
</style>