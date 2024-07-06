<template>
  <v-navigation-drawer
    v-model="drawer"
    class="nav-bg-color"
    :rail="rail"
    @click="rail = false"
    permanent
  >
    <v-toolbar density="compact" dense>
      <v-btn @click.stop="rail = !rail" icon="mdi-menu" variant="text"></v-btn>
      <v-spacer></v-spacer>
      <span v-show="!rail">{{ navToolBarHeader }}</span>
      <v-btn
        v-show="!rail"
        icon="mdi-account-circle-outline"
        variant="text"
      ></v-btn>
    </v-toolbar>

    <v-divider></v-divider>

    <v-list :lines="false" density="compact" nav>
      <v-list-subheader v-show="!rail" class="font-weight-bold">{{
        navBarMenuHeader
      }}</v-list-subheader>
      <v-list-item
        v-for="(item, i) in navItems"
        :key="i"
        :value="item"
        @click="$router.push(item.path)"
      >
        <template v-slot:prepend>
          <v-icon :icon="item.icon"></v-icon>
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
export default {
  mixins: [commonMixin],
  data() {
    return {
      drawer: true,
      rail: false,
      navToolBarHeader: "Grants D.",
      navBarMenuHeader: "Filecoin Workspace",
    };
  },
  computed: {
    ...mapGetters(["currentUser"]),
    navItems() {
      return navigationItems;
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