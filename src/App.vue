<template>
  <div id="app">
    <!-- <List title="Memory Game"/> -->
    <div class="app">
      <h1>{{ title }}</h1>
      <div>
        <button class="btn-play">Jogar!</button>
      </div>
      <ul class="list" v-if="cards.length">
        <li 
          class="flipper" 
          v-bind:class='{ "click" : (isActive[index])}' 
          v-for="(item, index) in cards" :key="index"
          @click="changeCard(item, index)"
        >
          <img class="img front" src="./assets/marvel-logo.png" alt="Marvel"/>
          <img class="img back" :src= " item.thumbnail.path + '.' + item.thumbnail.extension " :alt= "item.name"/>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// import List from "@/components/List";
import { get } from "@/services/marvel";

export default {
  components: {},
  data: () => ({
    title: "Jogo da Memória",
    cards: [],
    isActive: {},
    cardsSelected: []
  }),
  mounted() {
    get()
      .then(response => {
        const game = response.data.data;
        const filteredGame = game.results.filter(function filter(character) {
          return !character.thumbnail.path.endsWith("image_not_available");
        });
        filteredGame.length = 10;
        // const list = filteredGame.map(item => ({ ...item })) => forma alternativa de copiar os itens do array
        const list = filteredGame.map(item => Object.assign({}, item));
        // this.cards = filteredGame.concat(list);
        this.cards = this.fisherYattesSort(filteredGame.concat(list));
        // this.cards.sort(this.shuffleTrick()); => outro método para realizar o random dos cards (menos performático)
      })
      .catch(err => {});
  },
  methods: {

    changeCard: function(item, index) {
      if(this.cardsSelected.length === 0 && !this.isActive[index]) {
        this.changeImg(index)
        this.cardsSelected.push({item, index})
      }else if (this.cardsSelected.length === 1 && !this.isActive[index]) {

        this.cardsSelected.push({item, index})

        if (this.cardsSelected[1].item.id === this.cardsSelected[0].item.id) {
          this.changeImg(this.cardsSelected[1].item)
          this.cardsSelected = []
        }else {
          this.changeImg(index)
          let vue = this

          setTimeout(function(){
            vue.changeImg(vue.cardsSelected[0].index)
            vue.changeImg(vue.cardsSelected[1].index)
            vue.cardsSelected = []

          },1250)
        } // bug: continua comparando o card aberto com o último mesmo este sendo pasr de outro ( já estando aberto)
      }
    },

    changeImg: function(index) {
      this.$set(this.isActive, index, !this.isActive[index]);
    },

    fisherYattesSort: function(array) {
      let currentIndex = array.length;
      let temporaryValue;
      let randomIndex;

      while(0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    },

    shuffleTrick: function(array) {
      return 0.5 - Math.random(); 
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

  .btn-play {
    background-color: #233e7c;
    border: solid 1px blue;
    border-radius: 2em;
    box-shadow: 2px 3px #566a84;
    color: white;
    cursor: pointer;
    font-size: 1em;
    margin-left: 30px;
    padding: 12px 24px;
  }

  .list {
    display: grid;
    font-weight: bold;
    list-style-type: none;
    grid-gap: 15px;
    grid-template-columns: repeat(5, 1fr);
    perspective: 1000px;

    li {
      margin-bottom: 10px;
      padding-top: 8px;
    }

    .flipper {
      position: relative;
      transform-style: preserve-3d;
      transition: 0.5s ease-in;

      .img {
        backface-visibility: hidden;
        border: 3px solid #02235f;
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

    }

    .click {
      transform: rotateY(180deg);
    }
  }
}

</style>