<template>
  <v-navigation-drawer
    v-model="drawerPractice"
    permanent
    class="nav-draw-height-class"
  >
    <tutorial-tree @switch-practice-content="drawerPractice = !drawerPractice"></tutorial-tree>
  </v-navigation-drawer>

  <v-icon v-show="!drawerPractice" @click="drawerPractice = !drawerPractice">mdi-menu</v-icon>

  <v-container>
    <v-card elevation="0">
      <v-row>
        <v-col cols="12" md="5">
          <lesson-content></lesson-content>
        </v-col>
        <v-col cols="12" md="7">
          <motoko-editor
            :showNextBtn="true"
            :showPrevBtn="true"
          ></motoko-editor>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import TutorialTree from "@/components/tree/TutorialTree.vue";
import LessonContent from "@/components/LessonContent.vue";
import MotokoEditor from "@/components/MotokoEditor.vue";

export default {
  components: { TutorialTree, LessonContent, MotokoEditor },
  data() {
    return {
      drawerPractice: false,
    };
  },
};
</script>

<style scoped>
.nav-draw-height-class {
  height: 65% !important;
}
</style>
