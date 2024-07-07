<template>
  <v-card elevation="0"
    ><v-card-text
      ><v-row
        ><h3>Applied Grants </h3><v-spacer></v-spacer>
        <v-btn size="small" color="green" @click="newProposal">
          New Proposal
        </v-btn></v-row
      ></v-card-text
    >
    <v-card-text>
      <v-row>
        <v-col cols="12">
          <v-data-table
            :headers="headers"
            :items="grants"
           density="compact"
            :items-per-page="5"
            class="elevation-0"
          >
            <template v-slot:[`item.status`]="{ item }">
              <v-chip size="small" :color="getStatusColor(item.status)" dark>
                {{ item.status }}
              </v-chip>
            </template>
          </v-data-table>
        </v-col>
      </v-row></v-card-text
    >
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        { title: "Title", value: "title" },
        { title: "Description", value: "description" },
        { title: "Status", value: "status" },
      ],
      grants: [
        {
          title: "Grant 1",
          description: "Description of Grant 1",
          status: "Pending",
        },
        {
          title: "Grant 2",
          description: "Description of Grant 2",
          status: "Approved",
        },
        {
          title: "Grant 3",
          description: "Description of Grant 3",
          status: "Rejected",
        },
      ],
    };
  },
  methods: {
    getStatusColor(status) {
      switch (status) {
        case "Pending":
          return "yellow darken-2";
        case "Approved":
          return "green darken-2";
        case "Rejected":
          return "red darken-2";
        default:
          return "grey darken-2";
      }
    },
  },
};
</script>

<style></style>
