<template>
  <v-navigation-drawer
    v-model="drawer"
    permanent
    @click="rail = false"
    class="nav-draw-height-class"
  >
    <tutorial-tree></tutorial-tree>
  </v-navigation-drawer>

  <v-container>
    <v-card elevation="0">
      <v-toolbar color="cyan-lighten-1">
        <v-btn color="indigo" icon @click="drawer = !drawer">
          <v-icon>{{ !drawer ? "mdi-menu" : "mdi-menu-left-outline" }}</v-icon>
        </v-btn>
        <v-toolbar-title>Practice</v-toolbar-title>
      </v-toolbar>
      <v-row>
        <v-col cols="12" md="5">
          <lesson-content></lesson-content>
        </v-col>
        <v-col cols="12" md="7">
          <motoko-editor></motoko-editor>
        </v-col>
      </v-row>
    </v-card>
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
