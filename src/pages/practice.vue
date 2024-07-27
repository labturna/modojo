<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <tutorial-tree></tutorial-tree>
      </v-col>
      <v-col cols="6"></v-col>
    </v-row>
  </v-container>
</template>

<script>
import TutorialTree from '@/components/TutorialTree.vue';
export default {
  components: { TutorialTree },};
</script>

<style>
</style>