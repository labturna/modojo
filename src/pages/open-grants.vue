

<template>
  <v-card elevation="0">
    <motoko-editor></motoko-editor>
  </v-card>
</template>

<script>
import MotokoEditor from '../components/MotokoEditor.vue'

export default {
  name: "Education",
  components: {
    MotokoEditor
  },
  data() {
    return {

    };
  },

};
</script>

<style scoped>
.mdClass {
  font-size: 1em;
  line-height: 1.5;
}
</style>
