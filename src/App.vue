<template>
  <div id="app">
    <!-- <List title="Memory Game"/> -->
    <div class="">
      <h1>{{ title }}</h1>
      <ul v-if="cards.length">
        <li v-for="(item, index) in cards" :key="index">
          {{ item.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// import List from "@/components/List";
import { get } from "@/services/marvel";

export default {
  name: "app",
  components: {

  },
  data: () => ({
    title: "Memory Game",
    cards: []
  }),
  mounted() {
    get()
      .then((response) => {
        this.cards = response.data.data.results //refatorar
        
      }).catch((err) => {
        
      });
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
