<template>
  <v-card elevation="0">
    <v-card-item>
      <v-card-title>{{ courseJson.name }}</v-card-title>
      <v-card-subtitle>
        <span class="me-1 font-weight-bold">{{ currentContents?.name }}</span>
        <v-icon
          color="indigo"
          icon="mdi-language-markdown"
          size="small"
        ></v-icon>
      </v-card-subtitle>
    </v-card-item>

    <v-div class="custom-scrollable-content">
      <v-card-text class="markdownClass">
        <div v-html="lessonsContentMarkdown" class="markdown-content"></div>
        <v-divider></v-divider>
      </v-card-text>

      <v-card-text>
        <v-btn
          @click="toggleSolution"
          v-show="!showSolution"
          prepend-icon="mdi-help-circle-outline"
          rounded="xl"
          color="primary"
          size="small"
          >Show Solution</v-btn
        >
      </v-card-text>

      <v-card-text v-show="showSolution" class="markdownClass">
        <v-card-title class="pl-0"
          >Solutions
          <v-btn
            v-show="showSolution"
            @click="toggleSolution"
            rounded="xl"
            size="small"
            color="red"
            class="ml-2"
          >
            <v-icon>mdi-eye-off</v-icon>Hide
          </v-btn>
          <v-btn
            @click="copyToClipboard()"
            rounded="xl"
            size="small"
            color="primary"
            class="ml-2"
          >
            <v-icon>mdi-content-copy</v-icon>Copy
          </v-btn>
        </v-card-title>
        <div
          ref="solutionText"
          v-html="solutionMarkDown"
          class="markdown-content"
        ></div>
      </v-card-text>
    </v-div>
  </v-card>
</template>

<script>
import "highlight.js/styles/github.css";
import courseJson from "../../public/content/course.json";
import { mapGetters } from "vuex";
import { commonMixin } from "@/helpers/common";

export default {
  mixins: [commonMixin],
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
      return this.convertTextToMd(this.lessonContent);
    },
    solutionMarkDown() {
      return this.convertTextToMd(this.solutionContent);
    },
    courseJson() {
      return courseJson;
    },
  },
  async created() {
    await this.getMdDocsFiles(this.currentContents);
  },
  watch: {
    currentContents: {
      immediate: true,
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.getMdDocsFiles(newVal);
          this.$store.dispatch("setShowSolution", false); // Menüyü değiştirirken çözüm gösterimini kapat
        }
      },
    },
  },
  methods: {
    copyToClipboard() {
      this.copyToContent(this.$refs.solutionText);
    },
    async getMdDocsFiles(defaultContent) {
      this.$store.dispatch("getCurrentContent", defaultContent);
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

.code-block {
  position: relative;
  margin-bottom: 1rem;
}
</style>
