<template>
  <v-container class="motoko-editor">
    <code>/Main.mo</code>
    <v-row>
      <v-col cols="12">
        <v-textarea
          v-model="code"
          variant="outlined"
          label="Enter Motoko code here..."
          rows="10"
        ></v-textarea>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-btn
          @click="runCode"
          :loading="loading"
          :disabled="!code"
          prepend-icon="mdi-arrow-right-drop-circle"
          color="indigo"
          rounded="xl"
          size="large"
          >Run Code</v-btn
        >

        <v-btn
          :disabled="loading || !code"
          @click="clearCode()"
          icon
          variant="text"
          size="large"
        >
          <v-icon> mdi-delete-outline</v-icon>
          <v-tooltip activator="parent" location="bottom">Clear Code</v-tooltip>
        </v-btn>

        <v-btn
          :disabled="loading"
          @click="prev()"
          icon
          variant="text"
          size="large"
        >
          <v-icon> mdi-chevron-left</v-icon>
          <v-tooltip activator="parent" location="bottom">Prev</v-tooltip>
        </v-btn>

        <v-btn
          :disabled="loading"
          @click="next()"
          append-icon="mdi-chevron-right"
          color="indigo"
          rounded="xl"
          size="large"
          >Next
        </v-btn>
      </v-col>
    </v-row>

    <v-row>
      <code>OUTPUT</code>
      <v-divider></v-divider>
      <v-col cols="12" v-if="output">
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
import mo from "motoko/interpreter";

export default {
  data() {
    return {
      code: "",
      output: "",
      loading: false,
    };
  },
  methods: {
    async runCode() {
      try {
        this.loading = true;
        const path = "/main.mo";
        mo.clearPackages();
        await mo.installPackages({ base: "dfinity/motoko-base/master/src" });
        mo.write(path, this.code);
        const result = await mo.run(path);
        this.output = result.stdout || "No output produced.";
        this.loading = false;
      } catch (error) {
        this.output = `Error: ${error.message}`;
        this.loading = false;
      }
    },
    next() {
      this.clearCode();
      this.$store.dispatch("setNextLesson");
    },
    prev() {
      this.clearCode();
      this.$store.dispatch("setPrevLesson");
    },
    clearCode() {
      this.code = "";
      this.output = "";
    },
  },
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
