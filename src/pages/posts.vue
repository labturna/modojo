<template>
  <v-container>
    <v-card elevation="0" v-for="(post, index) in userPosts" :key="index">
      <v-card-item>
        <v-card-title class="font-weight-medium">{{ post.title }}</v-card-title>
      </v-card-item>

      <v-card-text class="font-weight-light">
        {{ post.body }}
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-card-actions>
          <v-btn @click="postDetails(post)"
            >See More
            <v-icon class="ml-4" color="#4f359b" right dark>
              mdi-arrow-right-bold-box-outline
            </v-icon></v-btn
          >
        </v-card-actions>
      </v-card-actions>
      <v-divider></v-divider>
    </v-card>

    <post-details
      :showPostDetailsDialog="postDetailsDialog"
      :post="currentPost"
      @closePostDetailsDialog="closePostDetailsDialog()"
    ></post-details>
  </v-container>
</template>
  <script>
import { mapGetters } from "vuex";
import PostDetails from "../components/PostDetails.vue";
export default {
  components: { PostDetails },
  computed: {
    ...mapGetters(["userPosts"]),
    user() {
      return this.currentUser || JSON.parse(localStorage.getItem("user"));
    },
  },
  created() {
    this.$store.dispatch("getUserPosts", this.user.id);
  },
  data() {
    return {
      loading: false,
      postDetailsDialog: false,
      currentPost: null,
    };
  },
  methods: {
    closePostDetailsDialog() {
      this.postDetailsDialog = false;
    },
    postDetails(post) {
      this.$store.dispatch("getPostComments", post.id);
      this.currentPost = post;
      this.postDetailsDialog = true;
    },
  },
};
</script>
  <style scoped>
.v-card .v-card-text {
  width: 50%;
}
.v-btn {
  text-transform: none !important;
}
</style>