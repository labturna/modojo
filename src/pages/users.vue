<template>
  <v-container>
    <v-row class="d-flex justify-space-around">
      <v-col v-for="(user, index) in userList" :key="index">
        <user-card
          :id="user.id"
          :name="user.name"
          :email="user.email"
          :phone="user.phone"
          :address="user.address"
          :company="user.company"
          :website="user.website"
        ></user-card>
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