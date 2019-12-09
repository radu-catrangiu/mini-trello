<template>
  <!-- Modal -->
  <div
    class="modal fade"
    id="boardAction"
    tabindex="-1"
    role="dialog"
    aria-labelledby="boardActionLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 v-if="mode==='create'" class="modal-title" id="boardActionLabel">Create Board</h5>
          <h5 v-if="mode==='edit'" class="modal-title" id="boardActionLabel">Edit Board</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form v-if="mode==='create'">
            <div class="form-group">
              <label for="boardName">Board Name</label>
              <input
                type="name"
                class="form-control"
                id="boardName"
                placeholder="My Awesome Board"
                v-model="board.name"
              />
            </div>
          </form>

          <form v-if="mode==='edit'">
            <div class="form-group">
              <label for="boardName">Board Name</label>
              <input
                type="name"
                class="form-control"
                id="boardName"
                placeholder="My Awesome Board"
                v-model="board.name"
              />
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button
            v-if="mode==='create'"
            type="button"
            class="btn btn-primary"
            data-dismiss="modal"
            v-on:click="create"
          >Create</button>
          <button
            v-if="mode==='edit'"
            type="button"
            class="btn btn-primary"
            data-dismiss="modal"
            v-on:click="edit"
          >Update</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BoardActionModal",
  props: {
    mode: String
  },
  mounted() {
    this.$("#boardAction").on("hidden.bs.modal", () => {
      this.board.id = "";
      this.board.name = "";
    });
  },
  data() {
    return {
      board: {
        id: "",
        name: ""
      }
    };
  },
  methods: {
    clean() {
      this.board.id = "";
      this.board.name = "";
    },
    create() {
      if (this.board.name.length < 2) {
        return;
      }
      this.axios
        .post("/boards", {
          name: this.board.name
        })
        .then(() => {
          this.clean();
          this.$emit("refresh");
        });
    },
    edit() {
      if (this.board.name.length < 2) {
        return;
      }
      this.axios
        .put("/boards", {
          id: this.board.id,
          name: this.board.name
        })
        .then(() => {
          this.clean();
          this.$emit("refresh");
        });
    },
    _setInput(value) {
      const { id, name } = value;
      this.board.id = id;
      this.board.name = name;
    }
  }
};
</script>

<style>
</style>