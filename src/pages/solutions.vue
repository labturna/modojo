<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" class="pa-0 pl-3">
        <v-btn @click="backChallengePage()" size="small" rounded="xl">
          <v-icon color="indigo">mdi-arrow-left</v-icon>
          <span class="text-indigo">Back</span>
        </v-btn>
      </v-col>
      <v-col cols="5">
        <v-card>
          <v-card-item>
            <template v-slot:subtitle>
              <v-chip
                size="small"
                :color="difficultyStatusColor(currentChallengeInfo.difficulty)"
              >
                {{ currentChallengeInfo.difficulty }}
              </v-chip>
              <v-chip
                @click="showHints()"
                size="small"
                class="ml-2"
                color="indigo"
              >
                <v-icon :icon="hintIcon" start></v-icon> Hints
              </v-chip>
              <v-chip
                @click="showSolutions()"
                size="small"
                class="ml-2"
                color="secondary"
              >
                <v-icon :icon="solutionIcon" start></v-icon> Solution
              </v-chip>

              <v-menu open-on-hover v-model="topicsMenu">
                <template v-slot:activator="{ props }">
                  <v-chip
                    v-bind="props"
                    size="small"
                    class="ml-2"
                    color="purple"
                  >
                    <v-icon :icon="topicsIcon" start></v-icon> Topics
                  </v-chip>
                </template>

                <v-card
                  v-if="currentChallengeInfo?.topics.length > 0"
                  width="200"
                  color="grey"
                >
                  <v-chip
                    label
                    class="mr-1 mb-1 mt-1"
                    v-for="item in currentChallengeInfo?.topics"
                    :key="item"
                  >
                    {{ item }}
                  </v-chip>
                </v-card>

              </v-menu>
            </template>
          </v-card-item>

          <v-card-text class="markdownClass">
            <div
              v-html="challengeContentMarkDown"
              class="markdown-content"
            ></div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="7">
        <motoko-editor
          :showNextBtn="false"
          :showPrevBtn="false"
        ></motoko-editor>
      </v-col>

      <!-- Hints Dialog -->
      <div class="text-center pa-4">
        <v-dialog v-model="hintDialog" width="auto">
          <v-card max-width="500" title="Hints">
            <template v-slot:prepend>
              <v-icon color="primary" :icon="hintIcon"></v-icon>
            </template>
            <v-card-text class="font-weight-light"
              >Use these hints to guide your approach to solving the challenge.
              Remember, hints provide helpful insights but do not directly solve
              the problem.
            </v-card-text>

            <v-list>
              <v-list-item
                v-for="(hint, i) in currentChallenge?.hints"
                :key="i"
                color="primary"
              >
                <v-card-text class="font-weight-light font-italic">
                  <v-icon size="small" color="indigo" :icon="hintIcon"></v-icon>
                  <span class="font-italic">{{ hint }}</span>
                </v-card-text>
              </v-list-item>
            </v-list>

            <template v-slot:actions>
              <v-btn
                class="ms-auto"
                text="OK"
                @click="hintDialog = false"
              ></v-btn>
            </template>
          </v-card>
        </v-dialog>
      </div>
      <!-- Solutions Dialog -->
      <div class="text-center pa-4">
        <v-dialog v-model="solutionDialog" width="auto">
          <v-card max-width="700" title="Solution">
            <template v-slot:prepend>
              <v-icon color="primary" :icon="solutionIcon"></v-icon>
            </template>
            <v-card-text class="font-weight-light"
              >The solution to this problem requires a systematic approach where
              you break down the task into manageable steps.Implement the logic
              step-by-step, ensuring that each part of your code solves a
              specific part of the problem.
            </v-card-text>

            <v-card-text class="markdownClass">
              <div
                ref="challengeSolutionText"
                v-html="challengeSolutionContentMarkDown"
                class="markdown-content"
              ></div>
            </v-card-text>

            <template v-slot:actions>
              <v-btn text="COPY" @click="copyChallengeContent()"></v-btn>
            </template>
          </v-card>
        </v-dialog>
      </div>
    </v-row>
  </v-container>
</template>

<script>
import "highlight.js/styles/github.css";
import { mapGetters } from "vuex";
import { commonMixin } from "@/helpers/common";
import MotokoEditor from "@/components/MotokoEditor.vue";
import Storage from "@/services/localstorage";

export default {
  components: { MotokoEditor },
  mixins: [commonMixin],
  data() {
    return {
      loading: false,
      hintDialog: false,
      solutionDialog: false,
      solutionIcon: "mdi-forum",
      topicsIcon: "mdi-format-list-bulleted",
      hintIcon: "mdi-lightbulb-on-outline",
      topicsMenu: false,
    };
  },
  computed: {
    ...mapGetters([
      "currentChallenge",
      "challengeProblemContent",
      "challengeSolutionContent",
    ]),
    challengeContentMarkDown() {
      return this.convertTextToMd(
        this.challengeProblemContent
          ? this.challengeProblemContent
          : Storage.get("currentChallengeContent")
      );
    },
    challengeSolutionContentMarkDown() {
      return this.convertTextToMd(this.challengeSolutionContent);
    },
    currentChallengeInfo() {
      return Object.keys(this.currentChallenge).length !== 0
        ? this.currentChallenge
        : Storage.get("currentChallenge");
    },
  },
  methods: {
    showHints() {
      this.hintDialog = true;
    },
    showSolutions() {
      this.$store.dispatch(
        "setChallengeSolutionContent",
        this.currentChallengeInfo
      );
      this.solutionDialog = true;
    },
    copyChallengeContent() {
      this.copyToContent(this.$refs.challengeSolutionText);
      this.solutionDialog = false;
    },
    backChallengePage() {
      this.$router.push("challenges");
    },
  },
};
</script>
