

<template>
  <v-card elevation="0">
    <v-container>
      <v-card-text class="mdClass">
        <div v-html="compiledMarkdown"></div>
      </v-card-text>
    </v-container>

    <v-navigation-drawer>
      <v-list>
        <v-list-subheader class="text-decoration-underline">On This Page</v-list-subheader>
        <v-list-item v-for="(header, index) in visibleHeaders" :key="index">
          <v-btn
            @click="getMdDocumentationFiles(header.id)"
            variant="tonal"
            size="x-small"
          >
            {{ index + 1 + "." + header.title }}
          </v-btn>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
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
      defaultMdId: "overview",
      visibleHeaders: [
        {
          id: "overview",
          title: "Overview",
        },
        {
          id: "motivation_and_goals",
          title: "Motivation and Goals",
        },
        {
          id: "why_motoko",
          title: "Why Motoko",
        },
      ],
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
    await this.getMdDocumentationFiles(this.defaultMdId);
  },

  methods: {
    // async getMdDocumentationFiles(id) {
    //   const response = await fetch(`../../public/documentation/${id}.md`);
    //   this.markdownContent = await response.text();
    // },
    async getMdDocumentationFiles() {
      const response = await fetch(`../../public/course.json`);
      console.log('response', response)
      this.markdownContent = await response.text();
    },
  },
};
</script>

<style scoped>
.mdClass {
  font-size: 1em;
  line-height: 1.5;
}
</style>
