<template>
  <div>
    <div v-if="!editMode" class="card" style="width: 18rem;">
      <div class="card-header">
        <div class="row">
          <div class="col">
            <h4>{{name}}</h4>
          </div>
          <div class="col text-right">
            <a class="text-primary mx-2" style="cursor: pointer;" v-on:click="editList">
              <i class="fas fa-edit"></i>
            </a>
            <a class="text-danger" style="cursor: pointer;" v-on:click="deleteList">
              <i class="fas fa-trash mt-2"></i>
            </a>
          </div>
        </div>
      </div>
      <ul class="list-group list-group-flush">
        <li
          class="list-card-item list-group-item"
          style="cursor: pointer;"
          v-for="card in cards"
          v-bind:key="card._id"
          v-on:click="editCard(card)"
        >
          <h5 class="card-title">{{card.title}}</h5>
          <p class="card-text">{{card.description}}</p>
        </li>
        <li v-if="cards.length === 0" class="list-group-item">
          <h5 class="card-title">Get Started!</h5>
          <p class="card-text">Add some content to your list!</p>
        </li>
      </ul>
      <div class="list-element-btn card-footer" v-on:click="addCard">
        <div class="row mt-2">
          <div class="col-sm text-center">
            <h5>Add Content</h5>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="card" style="width: 18rem;">
      <div class="card-header">
        <h4>Pick a new name</h4>
      </div>
      <div class="card-body">
        <div class="row mt-2">
          <input
            type="name"
            class="form-control my-3"
            id="newListName"
            placeholder="My Awesome List"
            v-model="newName"
          />
        </div>
        <div class="row mt-2">
          <div class="col-sm">
            <button
              type="button"
              class="btn btn-warning btn-block"
              v-on:click="newName=''; editMode=false"
            >Cancel</button>
          </div>
          <div class="col-sm">
            <button type="button" class="btn btn-primary btn-block" v-on:click="updateList">Update</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListElement",
  props: {
    id: String,
    name: String,
    boardId: String
  },
  data() {
    return {
      editMode: false,
      newName: "",
      cards: [],
      listId: ""
    };
  },
  mounted() {
    this.refreshCards();
  },
  methods: {
    refreshCards() {
      this.axios
        .get("/cards", { params: { board_id: this.boardId, list_id: this.id } })
        .then(res => {
          this.cards = res.data;
        })
        .catch(err => {
          // eslint-disable-next-line
          console.error(err);
        });
    },
    editCard(card) {
      this.$emit("editCard", this.id, card._id, card.title, card.description);
    },
    addCard() {
      this.$emit("addCard", this.id);
    },
    deleteList() {
      this.$emit("deleteList", this.id);
    },
    editList() {
      this.newName = this.name;
      this.editMode = true;
    },
    updateList() {
      this.$emit("editList", this.id, this.newName);
      this.editMode = false;
      this.newName = "";
    }
  }
};
</script>

<style>
.list-card-item {
  background: white;
  -webkit-transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;
  transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;
  transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
  transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;
}

.list-card-item:hover {
  background: #f9f9f9;
  -webkit-transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;
  transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;
  transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
  transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;
}

.list-element-btn {
  cursor: pointer;
  color: rgba(0, 0, 0, 0.75);
  background: #ffc107;
  border-color:#ffc107;
  -webkit-transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;
  transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;
  transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
  transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;
}
.list-element-btn:hover {
  cursor: pointer;
  color: white;
  background: #E1A801;
  border-color:#dea704;
  -webkit-transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;
  transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;
  transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
  transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;

}
</style>