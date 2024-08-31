<template>
  <v-container fluid>
    <v-row>
      <v-col cols="5">
        <v-card>
          <v-card-title>{{ selectedProblem.title }}</v-card-title>
          <v-card-subtitle>{{ selectedProblem.difficulty }}</v-card-subtitle>
          <v-card-text>
            <p>{{ selectedProblem.description }}</p>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="7">
        <v-card>
          <v-card-title>{{ selectedProblem.title }}</v-card-title>
          <v-card-subtitle>{{ selectedProblem.difficulty }}</v-card-subtitle>
          <v-card-text>
            <p>{{ selectedProblem.description }}</p>
            <v-textarea
              v-model="code"
              label="Your Solution"
              rows="10"
            ></v-textarea>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="runCode">Run</v-btn>
            <v-btn color="success" @click="submitCode">Submit</v-btn>
            <v-progress-linear
              v-if="loading"
              indeterminate
              color="blue"
            ></v-progress-linear>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      problems: [
        {
          title: "Two Sum",
          difficulty: "Easy",
          description: "Given an array of integers...",
          solved: true,
        },
        {
          title: "Longest Substring Without Repeating Characters",
          difficulty: "Medium",
          description: "Given a string...",
          solved: false,
        },
        {
          title: "Median of Two Sorted Arrays",
          difficulty: "Hard",
          description: "Given two sorted arrays...",
          solved: false,
        },
      ],
      selectedProblem: { title: "", difficulty: "", description: "" },
      code: "",
      loading: false,
    };
  },
  methods: {
    selectProblem(problem) {
      this.selectedProblem = problem;
    },
    runCode() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        alert("Code executed successfully!");
      }, 2000);
    },
    submitCode() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        alert("Code submitted!");
      }, 2000);
    },
  },
};
</script>
