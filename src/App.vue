<template>
  <div id="app">
    <!-- <List title="Memory Game"/> -->
    <div class="app">
      <h1>{{ title }}</h1>
      <ul class="list" v-if="cards.length">
        <li class="flipper" v-bind:class='{ "click" : (isActive[index])}' v-for="(item, index) in cards" :key="index">
          <img class="img front" src="./assets/marvel-logo.png" alt="Marvel" @click="changeImg(index)" />
          <img class="img back" :src= " item.thumbnail.path + '.' + item.thumbnail.extension " :alt= "item.name" @click="changeImg(index)"/>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// import List from "@/components/List";
import { get } from "@/services/marvel";

export default {
  components: {

  },
  data: () => ({
    title: "Jogo da Memória",
    cards: [],
    counter: 0,
    isActive: {}, 
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
        filteredGame.length = 10
        // const list = filteredGame.map(item => ({ ...item }))
        const list = filteredGame.map(item => Object.assign({}, item))
        this.cards = filteredGame.concat(list)         
      }).catch((err) => {

      });
  },
  methods: {
    changeImg: function(i) {
      this.$set(this.isActive, i, !this.isActive[i])
    }
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

.list {
  display: grid;
  font-weight: bold;
  list-style-type: none;
  grid-gap: 15px;
  grid-template-columns: repeat(5, 1fr);
  perspective: 1000; 

  li {
    margin-bottom: 10px;
    padding-top: 8px;
  }
}

.flipper {
  position: relative;
  transform-style: preserve-3d;   
  transition: 0.5s ease-in;
}

.click {
  transform: rotateY(180deg); 
}

.img {
  backface-visibility: hidden;   
  border: 2px solid #5f0214;
  border-radius: 3px;
  cursor: pointer;
  height: 250px;
  margin-top: 8px;
  width: 200px;
}

.front {
  z-index: 2;
  position: absolute;
}

.back {
  transform: rotateY(180deg); 
}
</style>