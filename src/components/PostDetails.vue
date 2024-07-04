<template>
  <v-dialog v-model="dialog" max-width="50%" persistent scrollable>
    <v-card class="custom-posts-card">
      <v-skeleton-loader :loading="postCommentsLoading" type="heading">
        <v-toolbar class="mt-3" color="white" elevation="0" dense>
          <v-toolbar-title>{{ post.title }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn @click="closeDialog" icon>
            <v-icon class="custom-posts-card" color="#4f359b">mdi-close-box-outline</v-icon>
          </v-btn>
        </v-toolbar>
      </v-skeleton-loader>

      <v-card-text>
        <v-row>
          <v-col cols="5">
            <v-skeleton-loader :loading="postCommentsLoading" type="paragraph">
              <v-card-text class="postDetailsClass">
                {{ post.body }}
              </v-card-text>
            </v-skeleton-loader>
          </v-col>

          <v-col cols="7">
            <v-card-text class="postDetailsClass">
              <v-skeleton-loader
                :loading="postCommentsLoading"
                type="heading, list-item-avatar-three-line@3"
              >
                <v-list lines="three">
                  <h2>Comments</h2>
                  <v-list-item
                    v-for="(comment, i) in postComments"
                    :key="i"
                    color="primary"
                  >
                    <template v-slot:prepend>
                      <v-avatar size="60">
                        <v-img src="../assets/image2.png"></v-img>
                      </v-avatar>
                    </template>

                    <v-list-item-title>{{ comment.email }}</v-list-item-title>
                    <v-list-item-subtitle>{{
                      comment.body
                    }}</v-list-item-subtitle>
                  </v-list-item>
                </v-list>
              </v-skeleton-loader>
            </v-card-text>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
  <script>
import { mapGetters } from "vuex";
export default {
  props: {
    showPostDetailsDialog: {
      type: Boolean,
      default: false,
    },
    post: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    ...mapGetters(["userTodos", "postCommentsLoading", "postComments"]),
    user() {
      return this.currentUser || JSON.parse(localStorage.getItem("user"));
    },
    dialog() {
      return this.showPostDetailsDialog;
    },
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    closeDialog() {
      this.$emit("closePostDetailsDialog");
    },
  },
};
</script>
  <style>
.postDetailsClass {
  height: 600px;
  overflow-y: scroll;
  line-height: 1.3rem !important;
}

.custom-posts-card {
  border-radius: 40px !important;
}

.postDetailsClass::-webkit-scrollbar {
  width: 3px;
}

.postDetailsClass::-webkit-scrollbar-track {
  background: #f1f1f1; /* Scroll bar arka plan rengi */
  border-radius: 10px; /* Köşeleri yuvarlatma */
}

.postDetailsClass::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
}

.postDetailsClass::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>