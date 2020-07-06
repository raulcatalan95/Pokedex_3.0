<template>
  <q-page class="index">
    <div class="cartas">
      <q-card
        class="my-card"
        v-for="(poke, i) in pokemones"
        :key="i"
        @click="vermas(i)"
        cursor-pointer
      >
        <img
          :src="`https://pokeres.bastionbot.org/images/pokemon/${poke.id}.png`"
          alt="nada"
        />

        <q-card-actions align="center">
          <h5>{{ poke.name }}</h5>
        </q-card-actions>
        <q-tooltip
          content-class="bg-secondary"
          content-style="font-size: 16px"
          :offset="[10, 10]"
        >
          Click para Ver Mas
        </q-tooltip>
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

    <q-dialog v-model="card">
      <q-layout view="Lhh lpR fff" container class="bg-white">
        <q-header class="bg-negative">
          <q-toolbar>
            <q-toolbar-title>Pokemon</q-toolbar-title>

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
            <div
              class="imagenes-poke"
              v-for="imagen in imagenesPoke"
              :key="imagen"
            >
              <img :src="imagen.img_front" alt="" />
              <img :src="imagen.img_back" alt="" />
            </div>
            <div class="habilidades">
              <h4>Habilidades</h4>
              <ul v-for="habilidad in habilidades" :key="habilidad">
                <li>
                  <h5>{{ habilidad.habilidad }}</h5>
                </li>
              </ul>
            </div>
            <div class="tipos">
              <h4>Tipo</h4>
              <ul v-for="typo in typoPoke" :key="typo">
                <li>
                  <h5>{{ typo.typo }}</h5>
                </li>
              </ul>
            </div>
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
      infopokes: "",
      typoPoke: [],
      imagenesPoke: [],
      habilidades: [],
      urlpoke: [],
      current: 1,
      card: false,
      stars: 3
    };
  },
  methods: {
    vermas(i) {
      this.habilidades = [];
      this.imagenesPoke = [];
      (this.typoPoke = []), (this.infopokes = "");
      this.card = true;
      this.infopokes = this.pokemones[i];

      //INGRESANDO HABILIDADES
      this.infopokes.abilities.forEach(e => {
        this.habilidades.push({
          habilidad: e.ability.name
        });
      });

      //INGRESANDO TYPO
      this.infopokes.types.forEach(e => {
        this.typoPoke.push({
          typo: e.type.name
        });
      });
      //INGRESANDO IMAGENES

      this.imagenesPoke.push({
        img_front: this.infopokes.sprites.front_default,
        img_back: this.infopokes.sprites.back_default
      });

      console.log(this.imagenesPoke);
      console.log(this.typoPoke);
      console.log(this.habilidades);
      // this.$store.dispatch("SetInfoPoke", i)
    }
  },
  computed: {
    ...mapState(["pokemones", "InfoPoke"])
  },
  mounted() {
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
.cartas {
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

.my-card:hover {
  box-shadow: #f5f500 5px 5px 5px;
  opacity: 0.9;
  color: #000;
  background-color: #ecec2a;
}
.my-card img {
  width: 100%;
  max-width: 300px;
  height: 300px;
  opacity: 1 !important;
}
.my-card h5 {
  margin: 0px;
}
.paginador {
  padding: 10px;
  background-color: $negative;
}
.Modal {
  background-image: url(../assets/fondo_poke.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  flex-direction: column;
  color: #fff;
}
.habilidades {
  background-color: #000;
  opacity: 0.6;
  width: 100%;
}
.habilidades:hover {
  background-color: #000;
 box-shadow: #fff 5px 5px 5px;
}
.tipos {
  background-color: #000;
  opacity: 0.6;
  width: 100%;
}
.tipos:hover {
  background-color: #000;
  box-shadow: #fff 5px 5px 5px;
}
.imagenes-poke{
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  
}
.imagenes-poke img{
  height: 150px;
  width: 150px;
 
}
.imagenes-poke img:hover{
   height: 200px;
  width: 200px;
}
</style>
