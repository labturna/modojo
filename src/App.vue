<template>
  <v-app>
    <v-main>
      <v-container fluid>
        <navigation-bar> </navigation-bar>

        <v-app-bar :elevation="0">
          <v-btn
            @click="redirect()"
            :prepend-icon="navGoHomeIcon"
            variant="text"
          >
            {{ navGoHomeName }}
          </v-btn>
          <span class="ml-2 text-body-1 text-medium-emphasis text-caption"
            >{{ appBarHeader }}
            <span class="font-weight-bold">{{ currentRootName }}</span>
          </span>

          <v-spacer></v-spacer>
          <div class="mr-2">
            <v-icon v-if="isDarkMode" color="indigo">mdi-weather-night</v-icon>
            <v-icon v-else color="orange">mdi-weather-sunny</v-icon>
          </div>
          <v-switch
           @change="toggleTheme"
            v-model="isDarkMode"
            hide-details
            inset
            class="mr-2"
          ></v-switch>
        </v-app-bar>

        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { commonMixin } from "./helpers/common";
import NavigationBar from "./components/NavigationBar.vue";
import { mapGetters } from "vuex";

export default {
  mixins: [commonMixin],
  computed: {
    ...mapGetters(["currentRootName"]),
  },
  data() {
    return {
      appBarHeader: "Your work",
      navGoHomeIcon: "mdi-keyboard-return",
      navGoHomeName: "Dashboard",
      defaultPath: "/overview",
      isDarkMode: true,
    };
  },
  components: { NavigationBar },
  watch: {
    $route(to, from) {
      if (this.getCurrentRootMethod() === "/") {
        this.redirectToResourcePage(this.defaultPath);
      }
      this.$store.dispatch("setCurrentRoot", to.name);
    },
  },
  methods: {
    redirect() {
      this.redirectToResourcePage(this.defaultPath);
    },
    toggleTheme() {
      this.$vuetify.theme.global.name = this.isDarkMode ? 'dark' : 'light';
    },
  },
};
</script>

<style>
.v-btn {
  text-transform: none !important;
}
</style>
