<template>
  <div>
    <div id="app">
      <img alt="Vue logo" class="mb-4" src="./assets/logo.png" />
      <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    </div>
    <boards-list />
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import BoardsList from "./components/BoardsList/BoardsList.vue";

export default {
  name: "app",
  components: {
    BoardsList
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
