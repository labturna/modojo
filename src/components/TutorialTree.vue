<template>
  <v-card elevation="0">
    <v-card-text class="custom-scrollable-content">
      <v-card-title>Contents</v-card-title>
      <v-treeview
        v-model:selected="tree"
        :items="treeItems"
        indeterminate-icon="mdi-bookmark-minus"
        item-title="name"
        item-value="slug"
        color="indigo"
        density="compact"
        transition
      >
        <template v-slot:prepend="{ item, open }">
          <v-icon x-small v-if="item.children">{{
            open ? "mdi-folder-open" : "mdi-folder"
          }}</v-icon>
          <v-icon v-else>mdi-language-markdown</v-icon>
        </template>
      </v-treeview>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      treeItems: [],
      search: null,
      caseSensitive: true,
      tree: [], // Başlangıçta boş bir dizi
      selectedObject: {},
    };
  },
  computed: {
    ...mapGetters(["currentContents"]),
    filter() {
      return this.caseSensitive
        ? (item, search, textKey) => item[textKey].indexOf(search) > -1
        : undefined;
    },
  },
  watch: {
    tree: {
      handler: function (val) {
        this.handleSelection(val);
      },
    },
    currentContents: {
      handler: function (val) {
        if (val) {
          this.tree = [val.slug]; // Doğru slug ile güncelle
          this.handleSelection([val.slug]);
        }
      },
    },
  },
  mounted() {
    this.fetchContent();
  },
  methods: {
    handleSelection(selected) {
      if (selected.length) {
        const selectedItemSlug = selected[0];
        this.selectedObject = this.findItemBySlug(this.treeItems, selectedItemSlug);
        this.$store.dispatch("getCurrentContent", this.selectedObject);
      }
    },
    findItemBySlug(items, slug) {
      for (const item of items) {
        if (item.slug === slug) {
          return item;
        }
        if (item.children) {
          const found = this.findItemBySlug(item.children, slug);
          if (found) {
            return found;
          }
        }
      }
      return null;
    },
    fetchContent() {
      fetch("../content/course.json")
        .then((response) => response.json())
        .then((data) => {
          this.treeItems = data.lessons;
          if (data.lessons.length) {
            this.tree = [data.lessons[0].slug]; // İlk öğeyi varsayılan olarak seç
            this.handleSelection([data.lessons[0].slug]); // Seçimi tetikle
          }
        })
        .catch((error) => {
          console.error("Content fetch error:", error);
        });
    },
  },
};
</script>

<style scoped>
.v-treeview {
  max-width: 400px;
}
</style>
