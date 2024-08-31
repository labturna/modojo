<template>
    <v-card @click="routeUserDetails(id)" hover class="mx-auto" width="400">
      <v-row>
        <v-col cols="4">
          <v-avatar class="ma-3" size="100">
            <v-img src="../assets/image2.png"></v-img>
          </v-avatar>
        </v-col>

        <v-col cols="8" class="d-flex align-center">
          <v-list>
            <v-list-item class="pl-0">
              <v-list-item-content>
                <v-list-item-title class="mb-1 font-weight-medium">{{
                  name
                }}</v-list-item-title>
                <v-list-item-subtitle class="font-weight-regular mb-2">{{
                  email
                }}</v-list-item-subtitle>
                <v-list-item-subtitle class="font-weight-regular">{{
                  phone
                }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>

      <v-list>
        <v-list-item v-for="file in userAddress" :key="file.title" class="mb-3">
          <v-list-item-title class="mb-1">
            <v-icon>
              {{ file.icon }}
            </v-icon>
            {{ file.title }}
          </v-list-item-title>

          <v-list-item-subtitle>{{ file.subtitle }}</v-list-item-subtitle>
        </v-list-item>
      </v-list>
    </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import { commonMixin } from "../../helpers/common";
export default {
  mixins: [commonMixin],
  data: () => ({
    userDetails: [
      {
        key: "location",
        title: "Location",
        subtitle: null,
        icon: "mdi-map-marker-outline",
      },
      {
        key: "company",
        title: "Company",
        subtitle: null,
        icon: "mdi-domain",
      },
      {
        key: "website",
        title: "Website",
        subtitle: null,
        icon: "mdi-web-plus",
      },
    ],
  }),
  computed: {
    ...mapGetters(["currentUser"]),
    userAddress() {
      return this.getUserDetails();
    },
  },
  props: {
    id: Number,
    name: String,
    email: String,
    phone: String,
    address: {
      type: Object,
      default: () => {},
    },
    company: {
      type: Object,
      default: () => {},
    },
    website: String,
  },
  methods: {
    getUserDetails() {
      return this.userDetails.map((detail) => {
        switch (detail.key) {
          case "location":
            return {
              ...detail,
              subtitle: this.address.city + "/" + this.address.street,
            };
          case "company":
            return { ...detail, subtitle: this.company.name };
          case "website":
            return { ...detail, subtitle: this.website };
          default:
            return detail;
        }
      });
    },
    async routeUserDetails(userId) {
      await this.$store.dispatch("getCurrentUser", userId);
    },
  },
};
</script>

<style>
</style>