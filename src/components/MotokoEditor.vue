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
        <v-btn @click="runCode" color="primary">Run Code</v-btn>
      </v-col>
    </v-row>
    <v-row v-if="output">
      <v-col cols="12">
        <v-card>
          <v-card-title>Output:</v-card-title>
          <v-card-text>
            <pre>{{ output }}</pre>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-if="debugOutput">
      <v-col cols="12">
        <v-card>
          <v-card-title>Debug Output:</v-card-title>
          <v-card-text>
            <pre>{{ debugOutput }}</pre>
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
      debugOutput: ''
    };
  },
  methods: {
    async runCode() {
      try {
        // Define virtual path
        const path = '/main.mo';

        // Clear any previously loaded packages
        mo.clearPackages();

        // Optionally, install the `base` package from GitHub
        await mo.installPackages({ base: 'dfinity/motoko-base/master/src' });

        // Write the Motoko code to a virtual file
        mo.write(path, this.code);

        // Execute the Motoko code
        const result = await mo.run(path);

        // Display result
        this.output = result.stdout || 'No output produced.';
        this.debugOutput = result.stderr || 'No debug output produced.';
      } catch (error) {
        this.output = `Error: ${error.message}`;
      } finally {
        // Optionally clean up virtual files
        // mo.delete(path); // Uncomment if you want to delete the file after execution
      }
    }
  }
};
</script>

<style scoped>
.motoko-editor {
  margin-top: 20px;
}
</style>
