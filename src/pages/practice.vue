<template>
  <v-row>
    <v-col cols="3">
      <tutorial-tree></tutorial-tree>
    </v-col>
      <v-col cols="5">
        <lesson-content></lesson-content>
      </v-col>
      <v-col cols="4">
       RUN CODE PAGE
      </v-col>
    </v-row>
</template>

<script>
import TutorialTree from '@/components/TutorialTree.vue';
import LessonContent from '@/components/LessonContent.vue';
export default {
  components: { TutorialTree, LessonContent }
  };
</script>

<style>
</style>