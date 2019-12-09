<template>
  <div>
    <div class="container">
      <div class="row">
        <button
          type="button"
          class="btn btn-primary btn-lg btn-block mb-3"
          data-toggle="modal"
          data-target="#boardAction"
          v-on:click="modalMode='create'"
        >Create Board</button>
      </div>
      <div class="row row-cols-1 row-cols-md-3 row-cols-sm-2">
        <div class="col my-2" v-for="board in boards" v-bind:key="board._id">
          <boards-button v-bind:name="board.name" v-bind:id="board._id" @refresh="refreshList" @edit="editBoard"/>
        </div>
      </div>
    </div>
    <board-action-modal ref="boardActionModal" v-bind:mode="modalMode" v-bind:selectedBoard="selectedBoard" @refresh="refreshList" />
  </div>
</template>

<script>
import BoardsButton from "./BoardsButton";
import BoardActionModal from "./BoardActionModal";
export default {
  name: "BoardsList",
  components: {
    BoardsButton,
    BoardActionModal
  },
  data() {
    return {
      boards: [],
      modalMode: "",
      selectedBoard: {
        id: "",
        name: ""
      }
    };
  },
  methods: {
    refreshList() {
      this.axios
        .get("/boards")
        .then(res => {
          this.boards = res.data;
        })
        .catch(err => {
          // eslint-disable-next-line
          console.error(err);
        });
    },
    editBoard(value) {
        // eslint-disable-next-line
        console.debug(this.$refs.boardActionModal);
        this.modalMode="edit"
        this.$refs.boardActionModal._setInput(value);
        this.$("#boardAction").modal("show")
    }
  },
  beforeMount() {
    this.refreshList()
  }
};
</script>

<style>
</style>