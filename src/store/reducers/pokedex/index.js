import {PokemonActionTypes} from './types'

const initialState = {
    isLoading: false,
    pokemons: [],
    error: '',
    currentPokemon: {},
    filter: []
}

export default function pokemonReducer(state = initialState, action) {
    switch(action.type) {
        case PokemonActionTypes.SET_POKEMONS:
            return {...state, pokemons: [...state.pokemons, ...action.payload]}
        case PokemonActionTypes.SET_IS_LOADING:
            return {...state, isLoading: action.payload}
        case PokemonActionTypes.SET_ERROR:
            return {...state, error: action.payload, isLoading: false}
        case PokemonActionTypes.SET_CURRENT_POKEMON:
            return {...state, currentPokemon: action.payload}
        case PokemonActionTypes.SET_FILTER:
            return {...state, filter: action.payload}
        default:
            return state;
    }
}