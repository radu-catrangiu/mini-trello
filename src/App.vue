<template>
  <div>
    <div id="app">
      <a href="#/" v-on:click="goHome"><img alt="Vue logo" class="mb-4" src="./assets/logo.png" /></a>
    </div>
    <router-view />
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
  margin-top: 60px;
}
</style>
