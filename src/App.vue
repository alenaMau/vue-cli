<template>
  <Header></Header>
  <router-view/>
  <Footer></Footer>
</template>



<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

button {
  cursor: pointer;
  background-color: #c3ea90;
  padding: 20px;
  border-radius: 10px;
  border: none;
}
</style>
<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default {
  components: {Header,Footer}
}
</script>