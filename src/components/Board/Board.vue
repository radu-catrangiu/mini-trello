<template>
  <div>
    <div class="container">
      <div class="row">
        <button type="button" class="btn btn-primary btn-lg btn-block" v-on:click="goBack">Back to Boards List</button>
      </div>
    </div>
    <div class="container-fluid">
      <div class="row row-cols-md-5">
        <div class="col my-3" v-for="list in lists" v-bind:key="list._id">
          <ListElement
            v-bind:name="list.name"
            v-bind:id="list._id"
            v-bind:boardId="boardId"
            v-bind:ref="list._id"
            @deleteList="deleteList"
            @editList="editList"
            @addCard="addCard"
            @editCard="editCard"
          />
        </div>
        <div class="col my-3">
          <div class="card text-center my-auto" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">Create List!</h5>

              <input
                type="name"
                class="form-control my-3"
                id="listName"
                placeholder="My Awesome List"
                v-model="newListName"
              />
              <button href="#" class="btn btn-success" v-on:click="createList">Create</button>
            </div>
          </div>
        </div>
      </div>

      <card-modal @refreshCards="refreshCards" ref="cardModal" v-bind:boardId="boardId" />
    </div>
  </div>
</template>

<script>
import ListElement from "./ListElement.vue";
import CardModal from "./CardModal.vue";
export default {
  name: "Board",
  components: {
    ListElement,
    CardModal
  },
  data() {
    return {
      boardId: "",
      newListName: "",
      lists: []
    };
  },
  mounted() {
    this.boardId = this.$route.query.id;
    this.refreshLists();
  },
  methods: {
    goBack() {
      this.$router.push("/");
    },
    refreshCards(listId) {
      this.$refs[listId][0].refreshCards();
    },
    refreshLists() {
      this.axios
        .get("/lists", { params: { board_id: this.boardId } })
        .then(res => {
          this.lists = res.data;
        })
        .catch(err => {
          // eslint-disable-next-line
          console.error(err);
        });
    },
    createList() {
      if (this.newListName.length < 2) {
        return;
      }
      this.axios
        .post("/lists", {
          board_id: this.boardId,
          name: this.newListName
        })
        .then(() => {
          this.newListName = "";
          this.refreshLists();
        });
    },
    editList(id, newName) {
      //eslint-disable-next-line
      console.log(id, newName);
      if (newName.length < 2) {
        return;
      }
      this.axios
        .put("/lists", {
          board_id: this.boardId,
          id,
          name: newName
        })
        .then(() => {
          this.refreshLists();
        });
    },
    deleteList(id) {
      this.axios
        .delete("/lists", {
          params: {
            id,
            board_id: this.boardId
          }
        })
        .then(() => {
          // eslint-disable-next-line
          this.refreshLists();
        })
        .catch(err => {
          // eslint-disable-next-line
          console.log(err);
        });
    },
    addCard(listId) {
      this.$refs.cardModal._setParams({
        edit: false,
        listId
      });
      this.$("#cardModal").modal("show");
    },
    editCard(listId, cardId, cardTitle, cardDescription) {
      this.$refs.cardModal._setParams({
        edit: true,
        listId,
        cardId,
        cardTitle,
        cardDescription
      });
      this.$("#cardModal").modal("show");
    }
  }
};
</script>

<style>
</style>