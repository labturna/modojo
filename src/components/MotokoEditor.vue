<template>
  <v-container class="motoko-editor">
    <v-row>
      <v-col cols="12">
        <h3>Enter Motoko Code Here...</h3>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <div class="textarea-wrapper">
          <div class="line-numbers" ref="lineNumbers">
            <pre v-for="(line, index) in lineNumbersContent.split('\n')" :key="index" :class="{ 'highlight-line': index === currentLine }">{{ line }}</pre>
          </div>
          <v-textarea
            v-model="code"
            outlined
            rows="16"
            class="custom-textarea"
            @input="updateLineNumbers"
            @scroll="syncScroll"
            @keyup="updateCurrentLine"
            ref="textarea"
            style="font: 13px 'Roboto Mono', monospace; line-height: 1.4;"
          ></v-textarea>
        </div>
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
        >Run Code</v-btn>

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
        >Next</v-btn>
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
import mo from "motoko/interpreter";

export default {
  data() {
    return {
      code: '',
      output: '',
      lineNumbersContent: '1',
      currentLine: 0,
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
    updateLineNumbers() {
      const lines = this.code.split('\n').length;
      this.lineNumbersContent = Array.from({ length: lines }, (_, i) => i + 1).join('\n');
      this.adjustLineNumbersHeight();
    },
    syncScroll() {
      const textarea = this.$refs.textarea.$el.querySelector('textarea');
      this.$refs.lineNumbers.scrollTop = textarea.scrollTop;
    },
    adjustLineNumbersHeight() {
      this.$nextTick(() => {
        const textarea = this.$refs.textarea.$el.querySelector('textarea');
        const lineNumbers = this.$refs.lineNumbers;
        lineNumbers.style.height = `${textarea.clientHeight}px`;
      });
    },
    updateCurrentLine() {
      const textarea = this.$refs.textarea.$el.querySelector('textarea');
      const cursorPosition = textarea.selectionStart;
      const lines = this.code.substr(0, cursorPosition).split('\n');
      this.currentLine = lines.length - 1;
    },
  },
  mounted() {
    this.updateLineNumbers();
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500&display=swap');

.motoko-editor {
  margin-top: 20px;
}

.textarea-wrapper {
  display: flex;
  position: relative;
}

.line-numbers {
  position: relative;
  padding-top: 18px;
  margin-right: -30px;
  left: 0;
  width: 40px;
  text-align: right;
  padding-right: 5px;
  color: gray;
  background: #f5f5f5;
  border-right: 1px solid #ccc;
  pointer-events: none;
  user-select: none;
  overflow: hidden;
  font-family: 'Roboto Mono', monospace;
  font-size: 15px;
  line-height: 1.5; /* Adjust line-height to match textarea */
}

.line-numbers .highlight-line {
  background-color: #d3ceed; /* Highlight color for the current line */
}

.custom-textarea {
  margin-left: 40px;
  width: calc(100% - 40px);
  font-family: 'Roboto Mono', monospace;
  line-height: 1.5; /* Adjust line-height to match line numbers */
}

.custom-textarea .v-textarea__input {
  line-height: 1.5; /* Ensure line-height is consistent */
  padding-left: 10px;
  resize: none;
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
