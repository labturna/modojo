<template>
  <v-app-bar :elevation="0">
    <template v-slot:prepend>
      <v-btn color="indigo" icon @click="drawer = !drawer">
        <v-icon>{{ !drawer ? "mdi-menu" : "mdi-menu-left-outline" }}</v-icon>
      </v-btn>
    </template>

    <v-app-bar-title>Practice</v-app-bar-title>
  </v-app-bar>

  <v-navigation-drawer
    v-model="drawer"
    permanent
    @click="rail = false"
    class="nav-draw-height-class"
  >
    <tutorial-tree></tutorial-tree>
  </v-navigation-drawer>

  <v-container>
    <v-row>
      <v-col cols="12" md="5">
        <lesson-content></lesson-content>
      </v-col>
      <v-col cols="12" md="7">
        <motoko-editor></motoko-editor>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TutorialTree from "@/components/TutorialTree.vue";
import LessonContent from "@/components/LessonContent.vue";
import MotokoEditor from "@/components/MotokoEditor.vue";

export default {
  components: { TutorialTree, LessonContent, MotokoEditor },
  data() {
    return {
      drawer: true,
    };
  },
};
</script>

<style scoped>
.nav-draw-height-class {
  height: 65% !important;
}
</style>
