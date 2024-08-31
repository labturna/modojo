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
      tree: [],
      selectedObject: {},
    };
  },
  computed: {
    ...mapGetters(["currentContents"]),
  },
  props: {
    challenges: {
      type: Array,
      default: () => [],
    },
    website: String,
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
          this.tree = [val.slug];
          this.handleSelection([val.slug]);
        }
      },
    },
  },
  methods: {
    handleSelection(selected) {
      if (selected.length) {
        const selectedItemSlug = selected[0];
        this.selectedObject = this.findItemBySlug(
          this.treeItems,
          selectedItemSlug
        );
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
  },
};
</script>

<style scoped>
.v-treeview {
  max-width: 400px;
}
</style>