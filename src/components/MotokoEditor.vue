<template>
  <v-container class="motoko-editor">
    <v-row>
      <v-col cols="12">
        <v-textarea
          v-model="code"
          label="Enter Motoko code here..."
          outlined
          rows="10"
        ></v-textarea>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-btn @click="runCode" color="primary"><v-icon>mdi-play</v-icon>Run Code</v-btn>
      </v-col>
    </v-row>
    <v-row v-if="output">
      <v-col cols="12">
        <v-card class="flex-grow-1">
          <v-card-title>Output:</v-card-title>
          <v-card-text class="output-text">
            <pre>{{ output }}</pre>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
import mo from 'motoko/interpreter';

export default {
  data() {
    return {
      code: '',
      output: '',
    };
  },
  methods: {
    async runCode() {
      try {
        const path = '/main.mo';

        mo.clearPackages();
        await mo.installPackages({ base: 'dfinity/motoko-base/master/src' });
        mo.write(path, this.code);
        const result = await mo.run(path);
        this.output = result.stdout || 'No output produced.';
      } catch (error) {
        this.output = `Error: ${error.message}`;
      } 
    }
  }
};
</script>

<style scoped>
.motoko-editor {
  margin-top: 20px;
}
.flex-grow-1 {
  flex-grow: 1;
}
.output-text {
  height: 100%;
  overflow-y: auto;
  white-space: pre-wrap; /* Ensures long lines wrap */
}
</style>
