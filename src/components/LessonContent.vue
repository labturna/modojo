<template>
  <v-card elevation="1">
    <v-card-item>
      <v-card-title>{{ courseJson.name }}</v-card-title>
      <v-card-subtitle>
        <span class="me-1 font-weight-bold">{{ currentContents?.name }}</span>
        <v-icon color="indigo" icon="mdi-language-markdown" size="small"></v-icon>
      </v-card-subtitle>
    </v-card-item>

    <v-container class="custom-scrollable-content">
      <v-card-text class="markdownClass">
        <div v-html="lessonsContentMarkdown" class="markdown-content"></div>
        <v-divider></v-divider>
      </v-card-text>

      <v-btn @click="toggleSolution" v-show="!showSolution" prepend-icon="mdi-help-circle-outline" rounded="xl" size="large" color="grey">Show Solution</v-btn>

      <v-card-text v-show="showSolution" class="markdownClass">
        <v-card-title class="pl-0 text-decoration-underline">Solutions
          <v-btn v-show="showSolution" @click="toggleSolution" rounded="xl" size="small" color="red" class="ml-2">
            <v-icon>mdi-eye-off</v-icon>Hide
          </v-btn>
          <v-btn @click="copyToClipboard" rounded="xl" size="small" color="primary" class="ml-2">
            <v-icon>mdi-content-copy</v-icon>Copy
          </v-btn>
        </v-card-title>
        <div ref="solutionText" v-html="solutionMarkDown" class="markdown-content"></div>
      </v-card-text>
    </v-container>
  </v-card>
</template>

<script>
import { marked } from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import courseJson from "../../public/content/course.json";
import { mapGetters } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters([
      "currentContents",
      "lessonContent",
      "solutionContent",
      "showSolution",
    ]),
    lessonsContentMarkdown() {
      return marked(this.lessonContent, {
        highlight: function (code, lang) {
          return hljs.highlightAuto(code).value;
        },
      });
    },
    solutionMarkDown() {
      return marked(this.solutionContent, {
        highlight: function (code, lang) {
          return hljs.highlightAuto(code).value;
        },
      });
    },
    courseJson() {
      return courseJson;
    },
  },
  async created() {
    await this.getMdDocsFiles(this.currentContents);
  },
  methods: {
    copyToClipboard() {
      const solutionTextElement = this.$refs.solutionText;
      const dummy = document.createElement("textarea");
      dummy.value = solutionTextElement.innerText;
      document.body.appendChild(dummy);
      dummy.select();
      document.execCommand("copy");
      document.body.removeChild(dummy);
    },
    async getMdDocsFiles(defaultContent) {
      this.$store.dispatch("getCurrentContent", defaultContent);
      this.$store.dispatch("setShowSolution", false); // Menüyü değiştirirken çözüm gösterimini kapat
    },
    toggleSolution() {
      const newShowSolution = !this.showSolution;
      this.$store.dispatch("setShowSolution", newShowSolution);
      if (newShowSolution) {
        this.$store.dispatch("getSolutionContent", this.currentContents);
      }
    },
  },
};
</script>

<style>
.markdownClass {
  font-size: 1em;
  line-height: 1.5;
}
</style>
