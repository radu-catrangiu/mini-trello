<template>
  <div>
    <!-- Button trigger modal -->

    <!-- Modal -->
    <div
      class="modal fade"
      id="cardModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="cardModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 v-if="edit" class="modal-title" id="cardModalLabel">Edit Card</h5>
            <h5 v-else class="modal-title" id="cardModalLabel">Create Card</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="cardTitle">Card Title</label>
                <input
                  type="title"
                  class="form-control"
                  id="cardTitle"
                  placeholder="My Awesome Card"
                  v-model="cardTitle"
                />
              </div>
              <div class="form-group">
                <label for="cardDescription">Card Description</label>
                <textarea
                  class="form-control"
                  id="cardDescription"
                  rows="3"
                  v-model="cardDescription"
                ></textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button
              v-if="!edit"
              type="button"
              class="btn btn-primary"
              v-on:click="createCard"
            >Create</button>
            <button v-if="edit" type="button" class="btn btn-danger" v-on:click="deleteCard">Delete</button>
            <button v-if="edit" type="button" class="btn btn-warning" v-on:click="updateCard">Update</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardModal",
  props: {
    boardId: String
  },
  data() {
    return {
      listId: "",
      cardId: "",
      cardTitle: "",
      cardDescription: "",
      edit: false
    };
  },
  mounted() {
    this.$("#cardModal").on("hidden.bs.modal", () => {
      this.cardTitle = "";
      this.cardDescription = "";
    });
  },
  methods: {
    createCard() {
      if (this.cardTitle.length < 2 || this.cardDescription.length < 2) {
        return;
      }
      this.axios
        .post("/cards", {
          board_id: this.boardId,
          list_id: this.listId,
          title: this.cardTitle,
          description: this.cardDescription
        })
        .then(() => {
          this.$emit("refreshCards", this.listId);
          this.$('#cardModal').modal('hide');
          this.cardTitle = "";
          this.cardDescription = "";
        });
    },
    updateCard() {
      if (this.cardTitle.length < 2 || this.cardDescription.length < 2) {
        return;
      }
      this.axios
        .put("/cards", {
          id: this.cardId,
          board_id: this.boardId,
          list_id: this.listId,
          title: this.cardTitle,
          description: this.cardDescription
        })
        .then(() => {
          this.$emit("refreshCards", this.listId);
          this.$('#cardModal').modal('hide');
          this.cardTitle = "";
          this.cardDescription = "";
        });
    },
    deleteCard() {
      this.axios
        .delete("/cards", {
          params: {
            id: this.cardId,
            board_id: this.boardId,
            list_id: this.listId
          }
        })
        .then(() => {
          this.$emit("refreshCards", this.listId);
          this.$('#cardModal').modal('hide');
        });
    },
    _setParams(value) {
      this.edit = value.edit;
      this.listId = value.listId;
      this.cardId = value.cardId || "";
      this.cardTitle = value.cardTitle || "";
      this.cardDescription = value.cardDescription || "";
    }
  }
};
</script>

<style>
</style>