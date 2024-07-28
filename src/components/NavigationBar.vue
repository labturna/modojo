<template>
  <v-navigation-drawer
    v-model="drawer"
    class="nav-bg-color"
    :rail="rail"
    @click="rail = false"
  >
    <v-toolbar density="compact" dense>
      <v-btn @click.stop="rail = !rail" icon="mdi-menu" variant="text"></v-btn>
      <v-spacer></v-spacer>
      <v-avatar size="30">
        <v-img
          alt="John"
          src="../assets/motoko_logo.svg"
        ></v-img>
      </v-avatar>
      <span class="mr-2" v-show="!rail">{{ navToolBarHeader }}</span>
    </v-toolbar>

    <v-divider></v-divider>

    <v-list
      v-model="currentNavItem"
      mandatory
      lines="one"
      density="compact"
      nav
    >
      <v-list-subheader v-show="!rail" class="font-weight-bold">{{
        navBarMenuHeader
      }}</v-list-subheader>

      <v-list-item
        v-for="(item, i) in navItems"
        :key="i"
        :value="item"
        @click="$router.push(item.path)"
        :color="navListItemColor"
      >
        <template v-slot:prepend>
          <v-tooltip :text="item.title">
            <template v-slot:activator="{ props }">
              <v-icon v-bind="props" :icon="item.icon"></v-icon>
            </template>
          </v-tooltip>
        </template>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
import { mapGetters } from "vuex";
import { commonMixin } from "../helpers/common";
import navigationItems from "../constant/navigationItemsConst";
import _ from "lodash";
export default {
  mixins: [commonMixin],
  data() {
    return {
      drawer: true,
      rail: false,
      navselectedItem: [1],
      navToolBarHeader: "Motoko",
      navBarMenuHeader: "Filecoin Workspace",
      navListItemColor: "indigo",
    };
  },
  computed: {
    ...mapGetters(["currentUser", "currentRootName"]),
    navItems() {
      return navigationItems;
    },
    currentNavItem() {
      const currentIndex = _.findIndex(navigationItems, {
        path: this.currentRootName,
      });
      return currentIndex;
    },
  },

  methods: {},
};
</script>
<style scoped>
.nav-bg-color {
  background-color: #f5f5f5 !important;
}
</style>