<template>
  <section>
    <h3>Оплата прошла успешно</h3>
  </section>
</template>

<script>
import VueCookies from "vue-cookies";
import router from "@/router";

if (!VueCookies.get('token')) {
  // router.push("/");
}

export default {
  name: "OrderCompleted"
}
</script>

<style scoped>
section {
  height: 85vh;
}
</style>