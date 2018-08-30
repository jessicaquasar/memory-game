<template>
  <div id="app">
    <!-- <List title="Memory Game"/> -->
    <div class="app">
      <img class="logo" src="./assets/marvel-logo.png" />
      <h1>{{ title }}</h1>
      <ul class="list" v-if="cards.length">
        <li v-for="(item, index) in cards" :key="index">
          <img class="img-cards" :src= " item.thumbnail.path + '.' + item.thumbnail.extension " :alt= "item.name" />
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
        const game = response.data.data
        const filteredGame = game.results.filter(
          function filter(character) {
            return !character.thumbnail.path.endsWith('image_not_available')
          }
        )
        // if (game.data && game.data.results.length > 0) {
          this.cards = filteredGame  
        // } else {
          // "http://i.annihil.us/u/prod/marvel/i/mg/6/20/52602f21f29ec"
          // http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available

        // }        
      }).catch((err) => {

      });
  }
};
</script>

<style lang="scss">
#app {
  color: #2c3e50;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 18px;
  margin-top: 60px;
  text-align: center;
}

.logo {
  height: 100px;
  width: 200px;
}

.list {
  // color: #ef0000;
  display: grid;
  font-weight: bold;
  list-style-type: none;
  // grid-auto-flow: column;
  grid-gap: 54px;
  grid-template-columns: repeat(6, 240px);
  // grid-template-rows: repeat(4, 300px);
  // width: 1500px;

  li {
    margin-bottom: 10px;
    padding-top: 8px;
  }
}

.img-cards {
  border: 2px solid #5f0214;
  border-radius: 3px;
  cursor: pointer;
  height: 250px;
  margin-top: 8px;
  width: 200px;
}
</style>
