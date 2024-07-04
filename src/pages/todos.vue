<template>
  <v-container>
    <v-card elevation="0">
      <v-list-item v-for="(todo, index) in userTodos" :key="index">
        <v-checkbox
          color="#4f359b"
          v-model="todo.completed"
          hide-details
          :label="todo.title"
        ></v-checkbox>
      </v-list-item>
    </v-card>
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["userTodos"]),
    user() {
      return JSON.parse(localStorage.getItem("user")) || this.currentUser;
    },
  },
  data() {
    return {
      loading: false,
    };
  },
};
</script>
<style>
</style>