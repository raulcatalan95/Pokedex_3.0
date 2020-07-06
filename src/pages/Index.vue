<template>
  <q-page class="index">

    <div class="cartas">
      <q-card class="my-card"  v-for="(poke, i) in pokemones" :key="i"  @click="vermas(i)">
        <img :src="`https://pokeres.bastionbot.org/images/pokemon/${poke.id}.png`" alt="nada" />

        <q-card-actions align="center">
          <h5>{{ poke.name }}</h5>
        </q-card-actions>
      </q-card>
      </div>

        <div class="paginador q-pa-lg flex flex-center">
       <q-pagination
      v-model="current"
      :max="10"
      input
      input-class="text-yellow-1"
    >
    </q-pagination>
    </div>

  <q-dialog v-model="card" v-for="(pokemon,i) in InfoPoke" :key="i">
      <q-layout view="Lhh lpR fff" container class="bg-white">
        <q-header class="bg-negative">
          <q-toolbar>
            
            <q-toolbar-title>{{pokemon.name}}</q-toolbar-title>
           
            <q-btn flat v-close-popup round dense icon="close" />
          </q-toolbar>
        </q-header>

        <q-footer class="bg-negative text-white">
          <q-toolbar inset>
            <q-toolbar-title>Pokedex</q-toolbar-title>
          </q-toolbar>
        </q-footer>  
         <q-page-container class="Modal">
          <q-page padding>
            
              <h2>{{pokemon.abilities[0].ability.name}}</h2>
               <h2>{{pokemon.abilities[1].ability.name}}</h2>
            
          </q-page>
        </q-page-container> 
          </q-layout>
    </q-dialog>
 
  </q-page>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
export default {
  name: "PageIndex",
  data() {
    return {
      urlpoke: [],
       current: 1,
      card:false,
      stars:3,
    };
  },
  methods: {
    vermas(i){
      this.card=true
      this.$store.dispatch("SetInfoPoke", i)
    }
  },
  computed: {
    ...mapState(["pokemones","InfoPoke"]),
  
  },
  created() {
    let datospoke = "";
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/`)
      .then(data => {
        datospoke = data.data.results;

        datospoke.forEach(e => {
          this.urlpoke.push(e.url);
        });
        //this.$store.dispatch("SetPokemones", data.data.results);
      })
      .then(res => {
        this.urlpoke.forEach(e => {
          axios.get(e).then(data => {
            console.log(data);
            this.$store.dispatch("SetPokemones", data.data);
          });
        });
      });
  }
};
</script>
<style lang="scss" scoped>
.index {
  background-image: url(../assets/fondo_poke.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  flex-direction: column; 
 
}
.cartas{
   display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
}
.my-card {
  width: 100%;
  max-width: 300px;
  height: 360px;
  margin: 5px;
  color: transparent;
  opacity: 0.7;
 background-color: #000;
  
}

.my-card:hover{
 box-shadow: #fff 5px 5px 5px;
  opacity: 0.9;
  color: #000;
  background-color: #fff;
  
 
}
.my-card img{
  width: 100%;
  max-width: 300px;
  height: 300px;
  opacity: 1.0 !important;
}
.my-card h5 {
  margin: 0px;
}
.paginador{
  
  padding: 10px;
  background-color:  $negative;
  
  
}
.Modal {
  background-image: url(../assets/fondo_poke.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  flex-direction: column;
  color:#fff;
 
}

</style>
