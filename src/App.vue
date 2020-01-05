<template>
  <div id="app">
    <Donate msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import Donate from "./components/Donate.vue";

export default {
  name: "app",
  components: {
    Donate
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
