<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="text-h5">Practice</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="drawer = !drawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" app temporary right>
      <tutorial-tree></tutorial-tree>
    </v-navigation-drawer>
    <v-main>
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
    </v-main>
  </v-app>
</template>

<script>
import TutorialTree from '@/components/TutorialTree.vue';
import LessonContent from '@/components/LessonContent.vue';
import MotokoEditor from '@/components/MotokoEditor.vue';

export default {
  components: { TutorialTree, LessonContent, MotokoEditor },
  data() {
    return {
      drawer: false,
    };
  },
};
</script>

<style scoped>
</style>
