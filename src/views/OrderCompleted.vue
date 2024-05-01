<template>
  <section>
    <h3>Оплата прошла успешно</h3>
  </section>
</template>

<script>
import VueCookies from "vue-cookies";

if (!VueCookies.get('token')) {
  window.location = '/';
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