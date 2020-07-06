import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    pokemones: [],
    InfoPoke:[],
  },
  mutations: {
    SET_POKEMONES(state,pokes){
      state.pokemones.push(pokes)
    },
    SET_INFOPOKE(state,i){
      state.InfoPoke=[];
      state.InfoPoke.push(state.pokemones[i])
    }
  },
  actions:{
SetPokemones({commit},pokes){
  commit("SET_POKEMONES", pokes);
},
SetInfoPoke({commit},i){
  commit("SET_INFOPOKE",i)
}

  }
});
