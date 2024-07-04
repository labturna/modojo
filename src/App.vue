<template>
  <v-app>
    <v-main>
      <v-container fluid>
        <navigation-bar></navigation-bar>
        <v-row d-flex flex-column mb-6>
          <v-col cols="12" class="mt-4">
            <v-btn
              @click="redirect()"
              prepend-icon="mdi-arrow-left-bold-box-outline"
              variant="text"
            >
              {{ isCurrentRootParams("/photos") ? "Go Albums" : "Go Home" }}
            </v-btn>
          </v-col>
          <v-col cols="12">
            <router-view></router-view>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { commonMixin } from "./helpers/common";
import NavigationBar from "./pages/NavigationBar.vue";
import { mapGetters } from "vuex";

export default {
  mixins: [commonMixin],
  computed: {
    ...mapGetters(["isUsersPage"]),
  },
  data() {
    return {
      headerName: "All users",
    };
  },
  components: { NavigationBar },
  methods: {
    redirect() {
      let path = "/users";
      if (this.isCurrentRootParams("/photos")) {
        path = "/albums";
      }
      this.redirectToResourcePage(path);
    },
  },
};
</script>

<style>
.v-btn {
  text-transform: none !important;
}
</style>
