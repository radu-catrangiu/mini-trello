<template>
  <div>
    <div id="app">
      <a href="#/" v-on:click="goHome"><img alt="Vue logo" class="mb-1 mt-2" src="./assets/logo.svg" /></a>
    </div>
    <router-view />
    <div class="fixed-bottom text-center mb-2 text-black-50">Catrangiu Radu © 2019</div>
  </div>
</template>

<script>
export default {
  name: "app",
  components: {},
  methods: {
    goHome() {
      this.$router.push("/");
    }
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
}
</style>
