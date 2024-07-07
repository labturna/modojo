<template>
  <v-card elevation="0"
    ><v-card-text
      ><v-row><h3>Open Grants</h3></v-row></v-card-text
    >
    <v-card-text>
      <v-row>
        <v-col v-for="(item, index) in items" :key="index" cols="12" md="4">
          <v-card variant="outlined">
            <v-card-title>{{ item.title }}</v-card-title>
            <v-card-text>{{ item.description }}</v-card-text>
          </v-card>
        </v-col>
      </v-row></v-card-text
    >
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { title: "Kart 1", description: "Bu, birinci kartın açıklamasıdır." },
        { title: "Kart 2", description: "Bu, ikinci kartın açıklamasıdır." },
        { title: "Kart 3", description: "Bu, üçüncü kartın açıklamasıdır." },
      ],
    };
  },
};
</script>

<style></style>
