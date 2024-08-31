<template>
  <v-card>
    <v-toolbar>
      <v-toolbar-title>
        <v-icon color="indigo">mdi-code-braces-box</v-icon>
        Code</v-toolbar-title
      >
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-card-text>
      <v-row>
        <v-col cols="12">
          <!-- <h3>Enter Motoko Code Here...</h3> -->

          <prism-editor
            class="my-editor height-300"
            v-model="code"
            :highlight="inputHighlighter"
            :line-numbers="lineNumbers"
          ></prism-editor>
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
            >Run Code</v-btn
          >

          <v-btn
            :disabled="loading || !code"
            @click="clearCode()"
            icon
            variant="text"
          >
            <v-icon> mdi-delete-outline</v-icon>
            <v-tooltip activator="parent" location="bottom"
              >Clear Code</v-tooltip
            >
          </v-btn>

          <v-btn
          v-show="showPrevBtn"
            :disabled="loading"
            @click="prev()"
            icon
            variant="text"
          >
            <v-icon> mdi-chevron-left</v-icon>
            <v-tooltip activator="parent" location="bottom">Prev</v-tooltip>
          </v-btn>

          <v-btn
          v-show="showNextBtn"
            :disabled="loading"
            @click="next()"
            append-icon="mdi-chevron-right"
            color="indigo"
            rounded="xl"
            >Next</v-btn
          >
        </v-col>
      </v-row>

      <v-row v-if="output">
        <v-col cols="12">
          <v-card class="flex-grow-1">
            <v-card-title>Output:</v-card-title>
            <v-card-text class="output-text">
              <prism-editor
                class="my-editor"
                v-model="output"
                :highlight="outputHighlighter"
              ></prism-editor>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
  
  <script>
import mo from "motoko/interpreter";
import { PrismEditor } from "vue-prism-editor";
import "vue-prism-editor/dist/prismeditor.min.css"; // import the styles somewhere
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-tomorrow.css"; // import syntax highlighting styles

export default {
  components: {
    PrismEditor,
  },
  data: () => ({
    code: 'console.log("Enter Motoko Code Here...")',
    lineNumbers: true,
    output: "",
    loading: false,
  }),
  props: {
    showPrevBtn: Boolean,
    showNextBtn: Boolean
  },
  methods: {
    inputHighlighter(code) {
      return highlight(code, languages.js); //returns html
    },
    outputHighlighter(code) {
      return highlight(code, languages.js); //returns html
    },
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
  
  <style lang="scss">
.my-editor {
  background: #2d2d2d;
  color: #ccc;
  font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
  font-size: 14px;
  line-height: 1.5;
  padding: 5px;
}

.prism-editor__textarea:focus {
  outline: none;
}

.height-300 {
  height: 400px;
}
</style>
  