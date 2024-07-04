<template >
  <v-row class="d-flex justify-space-around">
    <v-col v-for="(album, index) in userAlbums" :key="index">
      <v-card
        @click="getAlbumsPhotos(album)"
        hover
        class="mx-auto"
        width="400"
        height="450px"
      >
        <v-card-text>
          <user-albums :albumId="album.id"></user-albums>
          <p class="mt-3">
            {{ album.title }}
          </p>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import { mapGetters } from "vuex";
import UserAlbums from "../components/UserAlbums.vue";
import { commonMixin } from "../helpers/common";
export default {
  components: { UserAlbums },
  mixins: [commonMixin],
  computed: {
    ...mapGetters(["userAlbums"]),
    user() {
      return this.currentUser || JSON.parse(localStorage.getItem("user"));
    },
  },
  created() {
    this.getUserAlbums();
  },
  data: () => ({}),
  methods: {
    getUserAlbums() {
      this.$store.dispatch("getUserAlbums", this.user.id);
    },
    getAlbumsPhotos(album) {
      localStorage.setItem("album", JSON.stringify(album));
      this.redirectToResourcePage('photos')
    },
  },
};
</script>
<style>
</style>