<template>
  <div>
  </div>
</template>

<script>
export default {
  name: "Board",
  data() {
    return {
      board: {}
    };
  },
  mounted() {
    // eslint-disable-next-line
    console.log(this.$route.query.id);
  }
};
</script>

<style>
</style>