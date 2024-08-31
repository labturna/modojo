<template>
  <v-row justify="start">
    <v-col
      v-for="(c, idx) in courses"
      :key="idx"
      cols="2"
      sm="4"
      lg="3"
      xl="2"
      class="d-flex justify-start"
    >
      <course-card
        :_title="c.title"
        :_content="c.content"
        :_href="c.href"
        :_bgColor="c.bgColor"
        :_img="c.img"
        :_btnName="c.btnName"
      ></course-card>
    </v-col>

    <v-col sm="9" lg="12" xl="10">
      <challenges-table
        :title="courseCardTitle"
        :items="challengesDataItems"
        :loading="challengesTableLoading"
      ></challenges-table>
    </v-col>
    <!-- <v-col sm="3" lg="3" xl="2">
      <problem-summary-cards :_title="problemsCardTitle"></problem-summary-cards>
    </v-col> -->
  </v-row>
</template>

<script>
import ChallengesTable from "@/components/tables/ChallengesTable.vue";
import { mapGetters } from "vuex";
import CourseCard from "@/components/cards/CourseCard.vue";
import ProblemSummaryCards from "@/components/cards/ProblemSummaryCards.vue";
export default {
  components: { ChallengesTable, CourseCard, ProblemSummaryCards },
  data() {
    return {
      challengesDataItems: [],
      courseCardTitle: "Challenges",
      problemsCardTitle: "Rating",
      challengesTableLoading: false,
      courses: [
        {
          title: "Let's Practice",
          content: "Learning Modojo Coding",
          href: "/practice",
          bgColor: "indigo",
          img: "../../assets/tech4.jpeg",
          btnName: "Start Learning",
        },
        {
          title: "Overview",
          content: "Overview Modojo",
          href: "/overview",
          bgColor: "grey",
          img: "../../assets/tech4.jpeg",
          btnName: "Start Learning",
        },
      ],
    };
  },

  mounted() {
    this.fetchContent();
  },
  methods: {
    fetchContent() {
      this.challengesTableLoading = true;
      fetch("../challenges/challenges.json")
        .then((response) => response.json())
        .then((data) => {
          if (data.topics.length) {
            this.challengesDataItems = data.topics;
          }
        })
        .catch((error) => {
          console.error("Challenges contents fetch error:", error);
        })
        .finally(() => {
          this.challengesTableLoading = false;
        });
    },
  },
};
</script>

<style>
</style> 