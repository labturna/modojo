

<template>
  <h1>Overview</h1>
  <v-card>
    <v-card-title class="headline">Markdown İçeriği</v-card-title>

    <v-card-text>
      <div v-html="compiledMarkdown"></div>
    </v-card-text>
  </v-card>
</template>

<script>
import { marked } from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";

export default {
  data() {
    return {
      markdownContent: "",
    };
  },
  computed: {
    compiledMarkdown() {
      return marked(this.markdownContent, {
        highlight: function (code, lang) {
          return hljs.highlightAuto(code).value;
        },
      });
    },
  },
  async created() {
    const response = await fetch("../../README.md");
    this.markdownContent = await response.text();
  },
};
</script>

<style scoped>
</style>
