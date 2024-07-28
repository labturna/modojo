<template>
  <v-row>
    <v-col cols="3">
      <tutorial-tree></tutorial-tree>
    </v-col>
      <v-col cols="5">
        <lesson-content></lesson-content>
      </v-col>
      <v-col cols="4">
       <motoko-editor></motoko-editor>
      </v-col>
    </v-row>
</template>

<script>
import TutorialTree from '@/components/TutorialTree.vue';
import LessonContent from '@/components/LessonContent.vue';
import MotokoEditor from '@/components/MotokoEditor.vue';
export default {
  components: { TutorialTree, LessonContent, MotokoEditor },
  };
</script>

<style>
</style>