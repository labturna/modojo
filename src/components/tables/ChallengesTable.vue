<template>
  <v-data-table :headers="headers" :items="items" :loading="loading">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Challanges</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
      </v-toolbar>
    </template>

    <template v-slot:[`item.difficulty`]="{ item }">
      <span
        class="font-weight-bold"
        :class="`text-${difficultyStatusColor(item.difficulty)}`"
        >{{ item.difficulty }}</span
      >
    </template>

    <template v-slot:[`item.actions`]="{ item }">
      <v-btn
        color="indigo"
        size="small"
        variant="outlined"
        prepend-icon="mdi-arrow-right-circle"
        @click="routeSolutionPage(item)"
      >
        <template v-slot:prepend>
          <v-icon></v-icon>
        </template>
        Solve
        <template v-slot:append>
          <v-icon color="warning"></v-icon>
        </template>
      </v-btn>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize"> Reset </v-btn>
    </template>

    <template v-slot:loading>
      <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
    </template>
  </v-data-table>
</template>

<script>
import { commonMixin } from "@/helpers/common";
import FilterTable from "../FilterTable.vue";

export default {
  components: { FilterTable },
  mixins: [commonMixin],
  data: () => ({
    headers: [
      {
        title: "No",
        align: "start",
        sortable: false,
        key: "id",
      },
      { title: "Title", key: "title" },
      { title: "Description", key: "description", width: "50%" },
      { title: "Difficulty", key: "difficulty" },
      { title: "Actions", key: "actions", sortable: false },
    ],
  }),

  props: {
    title: String,
    loading: Boolean,
    items: {
      type: Array,
      default: () => [],
    },
  },

  methods: {
    routeSolutionPage(item) {
      this.$store.dispatch("setChallengeProblemContent", item);
      this.$router.push('/solutions');

    },
  },
};
</script>
<style></style>