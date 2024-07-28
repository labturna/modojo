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
            <pre>{{ lineNumbersContent }}</pre>
          </div>
          <v-textarea
            v-model="code"
            outlined
            rows="16"
            class="custom-textarea"
            @input="updateLineNumbers"
            @scroll="syncScroll"
            ref="textarea"
          ></v-textarea>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-btn @click="runCode" color="primary">
          <v-icon>mdi-play</v-icon>Run Code
        </v-btn>
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
      lineNumbersContent: '1',
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
  padding-top: 12px;
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
}

.custom-textarea {
  margin-left: 40px; /* Adjust this value as needed to match .line-numbers width */
  width: calc(100% - 40px); /* Adjust this value as needed to match .line-numbers width */
  font-family: 'Montserrat', sans-serif; /* Montserrat font */
  font-size: 6px !important;
}

.custom-textarea .v-textarea__input {
  line-height: 1.5;
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
