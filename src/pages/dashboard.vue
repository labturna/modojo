<template>
  <v-container>
    <v-row class="d-flex justify-space-around">
      <v-col v-for="(user, index) in userList" :key="index">
        {{ user }}
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: "Dashboard",
  computed: {},
  data() {
    return {
      loading: false,
      userList: [
        {
          name: "ozkan",
          job: "full-stack-engineer",
        },
      ],
    };
  },
  methods: {},
};
</script>
<style>
</style>