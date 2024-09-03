<template>
  <v-card width="auto">
    <v-card-item>
      <div class="text-h6 mb-1">{{ _title }}</div>
    </v-card-item>

    <v-card-text>
      <v-row>
        <v-col cols="6" class="d-flex justify-center align-center">
          <v-progress-circular
            :model-value="(_totalProblems.solved / _totalProblems.total) * 100"
            :rotate="360"
            :size="100"
            :width="15"
            color="teal"
          >
            Total <br />
            {{ _totalProblems.solved }} / {{ _totalProblems.total }}
          </v-progress-circular>
        </v-col>

        <v-col cols="6">
          <v-list>
            <v-list-subheader>Difficulties</v-list-subheader>
            <v-list-item v-for="d in difficulties" :key="d.key">
              <v-list-item-title :class="`text-${d.color}`">{{
                d.key
              }}</v-list-item-title>
              <v-list-item-subtitle>
                {{ d.solved }} / {{ d.total }}
              </v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
  
  <script>
import { commonMixin } from "@/helpers/common";
export default {
  mixins: [commonMixin],
  data() {
    return {
      loading: false,
      value: 70,
    };
  },
  props: {
    _title: String,
    _totalProblems: {
      type: Object,
      default: () => ({
        total: 100,
        solved: 20,
      }),
    },
    difficulties: {
      type: Array,
      default: () => [
        {
          key: "Easy",
          total: 70,
          solved: 10,
          color: "green",
        },
        {
          key: "Medium",
          total: 20,
          solved: 5,
          color: "orange",
        },
        {
          key: "Hard",
          total: 10,
          solved: 5,
          color: "red",
        },
      ],
    },
  },
  methods: {
    goToCoursePage() {
      this.redirectToResourcePage(this._href);
    },
  },
};
</script>
  
  <style>
</style>