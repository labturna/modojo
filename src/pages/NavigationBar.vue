<template>
  <v-navigation-drawer
    v-model="drawer"
    class="navigationBackgroundColor"
    :rail="rail"
    @click="rail = false"
    permanent
  >
    <v-toolbar density="compact" dense>
      <v-btn color="red" icon="mdi-alpha-g-circle" variant="text"></v-btn>
      <v-spacer></v-spacer>
      <v-btn
        icon="mdi-chevron-left"
        variant="text"
        @click.stop="rail = !rail"
      ></v-btn>
      <v-btn icon="mdi-account-circle-outline" variant="text"></v-btn>
    </v-toolbar>

    <v-divider></v-divider>

    <v-list :lines="false" density="compact" nav>
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
import navigationItems from "../constant/navigationItems";
export default {
  mixins: [commonMixin],
  data() {
    return {
      drawer: true,
      rail: false,
    };
  },
  computed: {
    ...mapGetters(["currentUser"]),
    navItems() {
      return navigationItems;
    },
  },
};
</script>
<style scoped>
.navigationBackgroundColor {
  background-color: #f5f5f5 !important;
}
</style>