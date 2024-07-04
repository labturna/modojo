<template>
  <v-row no-gutters>
    <v-col v-for="n in 4" :key="n" class="d-flex child-flex" cols="6">
      <v-img
        :lazy-src="albumsPhotos[n]?.url"
        :src="albumsPhotos[n]?.url"
        aspect-ratio="1"
        class="bg-grey-lighten-2"
        cover
      >
        <template v-slot:placeholder>
          <v-row align="center" class="fill-height ma-0" justify="center">
            <v-progress-circular
              color="grey-lighten-5"
              indeterminate
            ></v-progress-circular>
          </v-row>
        </template>
      </v-img>
    </v-col>
  </v-row>
</template>
<script>
import { mapGetters } from "vuex";
import { commonMixin } from "../helpers/common";
export default {
  mixins: [commonMixin],
  computed: {
    ...mapGetters(["currentUser", "albumsPhotos"]),
  },
  props: {
    albumId: Number,
  },
  created() {
    this.getAlbumsPhotos(this.albumId);
  },
  data: () => ({}),
  methods: {
    getAlbumsPhotos(albumId) {
      this.$store.dispatch("getAlbumsPhotos", albumId);
    },
  },
};
</script>
<style>
</style>