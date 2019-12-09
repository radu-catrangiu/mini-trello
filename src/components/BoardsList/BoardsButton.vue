<template>
  <div class="card">
    <div class="card-body">
      <div class="container">
        <div class="row">
          <h2 class="mx-auto">{{name}}</h2>
        </div>
        <div class="row">
          <div class="col-sm">
            <button type="button" class="btn btn-primary btn-block" v-on:click="openBoard">Open Board</button>
          </div>
        </div>
        <div class="row mt-2">
          <div class="col-sm">
            <button type="button" class="btn btn-warning btn-block" v-on:click="editBoard">Edit</button>
          </div>
          <div class="col-sm">
            <button type="button" class="btn btn-danger btn-block" v-on:click="deleteBoard">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BoardsButton",
  props: {
    name: String,
    id: String
  },
  methods: {
    openBoard() {
        this.$router.push({ path: 'board', query: { id: this.id }})
    },
    deleteBoard() {
      this.axios
        .delete("/boards", {
          params: {
            id: this.id
          }
        })
        .then(res => {
          // eslint-disable-next-line
          console.log(res);
          this.$emit("refresh");
        })
        .catch(err => {
          // eslint-disable-next-line
          console.log(err);
        });
    },
    editBoard() {
      this.$emit("edit", { name: this.name, id: this.id });
    }
  }
};
</script>

<style>
</style>