import axios from "axios";

export default class PokeService {
    static async getTypes() {
        return axios.get('https://pokeapi.co/api/v2/type?limit=999')
    }
    static async getSinglePokemonData(url) {
        return axios.get(url)
    }
    static async getNextPageOfPokemons(offset) {
        return axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=12`)
    }
    static async getAllPokemons(offset) {
        return axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=9999`)
    }
}