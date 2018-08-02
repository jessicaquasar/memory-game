<template>
  <div id="app">
    <List title="Memory Game"/>
  </div>
</template>

<script>
import List from "@/components/List";
import { get } from "@/services/marvel";

export default {
  name: "app",
  components: {
    List
  },
  data: () => ({
    cards: []
  }),
  mounted() {
    get()
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
