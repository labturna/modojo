<template>
  <v-hover v-slot="{ isHovering, props }">
    <v-card
      @click="goToCoursePage()"
      :class="{ 'on-hover': isHovering }"
      :elevation="isHovering ? 12 : 2"
      v-bind="props"
      width="300px"
      :color="_bgColor"
    >
      <v-img src="../../assets/tech3.jpg" height="125px" cover>
        <v-card-item>
          <div class="text-h6 mb-1">{{ _title }}</div>
          <div class="text-caption">
            {{ _content }}
          </div>
        </v-card-item>

        <v-card-actions>
          <v-btn
            size="small"
            variant="flat"
            color="white"
            @click="goToCoursePage()"
          >
            {{ _btnName }}
          </v-btn>
        </v-card-actions>
      </v-img>
    </v-card>
  </v-hover>
</template>

<script>
import { commonMixin } from "@/helpers/common";
export default {
  mixins: [commonMixin],
  data() {
    return {
      loading: false,
    };
  },
  props: {
    _title: String,
    _content: String,
    _href: String,
    _bgColor: String,
    _img: String,
    _btnName: String,
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