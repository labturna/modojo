<template>
  <v-container>
    <v-row class="d-flex justify-space-around">
      <v-col v-for="(user, index) in userList" :key="index">
        {{ user }}
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";
import UserCard from "../components/UserCard.vue";
export default {
  components: { UserCard },
  computed: {
    ...mapGetters(["userList"]),
  },
  created() {
    this.$store.dispatch("getAllUsers");
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {},
};
</script>
<style>
</style>