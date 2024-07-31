<template>
  <v-card elevation="0">
    <v-container>
      <v-card-text class="markdownClass">
        <div ref="markdownContent" v-html="lessonsContentMarkdown" class="markdown-content"></div>
      </v-card-text>
    </v-container>

    <v-navigation-drawer>
      <v-list>
        <v-list-subheader class="text-decoration-underline">On This Page</v-list-subheader>
        <v-list-item v-for="(header, index) in visibleHeaders" :key="index">
          <v-btn @click="getMdDocsFiles(header.id)" variant="tonal" size="x-small">
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
import { nextTick } from "vue";

export default {
  data() {
    return {
      markdownContent: "",
      defaultMdId: "overview",
      visibleHeaders: [
        { id: "overview", title: "Overview" },
        { id: "motivation_and_goals", title: "Motivation and Goals" },
        { id: "why_motoko", title: "Why Motoko" },
        { id: "Array", title: "Array" },
        { id: "AssocList", title: "AssocList" },
        { id: "Blob", title: "Blob" },
        { id: "Bool", title: "Bool" },
        { id: "Buffer", title: "Buffer" },
        { id: "CertifiedData", title: "Certified Data" },
        { id: "Char", title: "Char" },
        { id: "Debug", title: "Debug" },
        { id: "Deque", title: "Deque" },
        { id: "Error", title: "Error" },
        { id: "ExperimentalCycles", title: "Experimental Cycles" },
        { id: "ExperimentalInternetComputer", title: "Experimental Internet Computer" },
        { id: "ExperimentalStableMemory", title: "Experimental Stable Memory" },
        { id: "Float", title: "Float" },
        { id: "Func", title: "Func" },
        { id: "Hash", title: "Hash" },
        { id: "HashMap", title: "Hash Map" },
        { id: "Heap", title: "Heap" },
        { id: "Index", title: "Index" },
        { id: "Int", title: "Int" },
        { id: "Int8", title: "Int8" },
        { id: "Int16", title: "Int16" },
        { id: "Int32", title: "Int32" },
        { id: "Int64", title: "Int64" },
        { id: "Iter", title: "Iter" },
        { id: "IterType", title: "IterType" },
        { id: "List", title: "List" },
        { id: "Nat", title: "Nat" },
        { id: "Nat8", title: "Nat8" },
        { id: "Nat16", title: "Nat16" },
        { id: "Nat32", title: "Nat32" },
        { id: "Nat64", title: "Nat64" },
        { id: "None", title: "None" },
        { id: "Option", title: "Option" },
        { id: "Order", title: "Order" },
        { id: "Prelude", title: "Prelude" },
        { id: "Principal", title: "Principal" },
        { id: "Random", title: "Random" },
        { id: "RBTree", title: "RBTree" },
        { id: "Region", title: "Region" },
        { id: "Result", title: "Result" },
        { id: "Stack", title: "Stack" },
        { id: "Text", title: "Text" },
        { id: "Time", title: "Time" },
        { id: "Timer", title: "Timer" },
        { id: "Trie", title: "Trie" },
        { id: "TrieMap", title: "Trie Map" },
        { id: "TrieSet", title: "Trie Set" }
      ],
    };
  },
  computed: {
    lessonsContentMarkdown() {
      return marked(this.markdownContent, {
        highlight: function (code, motoko) {
          return hljs.highlightAuto(code).value;
        },
      });
    },
  },

  async created() {
    await this.getMdDocsFiles(this.defaultMdId);
  },

  watch: {
    lessonsContentMarkdown() {
      nextTick(() => {
        this.highlightCode();
      });
    },
  },

  methods: {
    async getMdDocsFiles(id) {
      const response = await fetch(`../documentation/${id}.md`);
      this.markdownContent = await response.text();
      nextTick(() => {
        this.highlightCode();
      });
    },
    highlightCode() {
      const blocks = this.$refs.markdownContent.querySelectorAll("pre code");
      blocks.forEach((block) => {
        hljs.highlightElement(block);
      });
    },
  },
};
</script>

<style scoped>
.markdownClass {
  font-size: 1em;
  line-height: 1.5;
}
</style>
