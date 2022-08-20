import {PokemonActionTypes} from './types'
import PokeService from '../../../api/PokeService'

export const PokemonActionCreators = {
    setIsLoading: (payload) => ({ type: PokemonActionTypes.SET_IS_LOADING, payload }),
    setError: (payload) => ({ type: PokemonActionTypes.SET_ERROR, payload }),
    setPokemons: (payload) => ({ type: PokemonActionTypes.SET_POKEMONS, payload }),
    setCurrentPokemom: (payload) => ({type: PokemonActionTypes.SET_CURRENT_POKEMON, payload}),
    setFilter: (payload) => ({type: PokemonActionTypes.SET_FILTER, payload}),

    loadNextBatchOfPokemons: (offset) => async (dispatch) => {
        try {
            dispatch(PokemonActionCreators.setIsLoading(true))
            const response = await PokeService.getNextPageOfPokemons(offset)
            const pokemons = response.data?.results
            if (pokemons) {
                dispatch(PokemonActionCreators.setPokemons(pokemons))
            } else {
                dispatch(PokemonActionCreators.setError('Failed to load data. Maybe try again?'))
            }
            dispatch(PokemonActionCreators.setIsLoading(false))
            // console.log(response);
        } catch (error) {
            dispatch(PokemonActionCreators.setError('Something went wrong. Try reloading the page.'))
        }
    },
    loadAllPokemons: (offset) => async (dispatch) => {
        try {
            dispatch(PokemonActionCreators.setIsLoading(true))
            const response = await PokeService.getAllPokemons(offset)
            const pokemons = response.data?.results
            if (pokemons) {
                dispatch(PokemonActionCreators.setPokemons(pokemons))
            } else {
                dispatch(PokemonActionCreators.setError('Failed to load data. Maybe try again?'))
            }
            dispatch(PokemonActionCreators.setIsLoading(false))
            // console.log(response);
        } catch (error) {
            dispatch(PokemonActionCreators.setError('Something went wrong. Try reloading the page.'))
        }
    },
    selectPokemon: (url) => async (dispatch) => {
        try {
            const response = await PokeService.getSinglePokemonData(url)
            const pokeData = response.data
            if (pokeData) {
                dispatch(PokemonActionCreators.setCurrentPokemom(pokeData))
            } else {
                dispatch(PokemonActionCreators.setError('Failed to load data. Maybe try again?'))
            }
        } catch (error) {
            dispatch(PokemonActionCreators.setError('Something went wrong. Try agian.'))
        }
    },
    toogleFilter: (types) => (dispatch) => {
        try {
            dispatch(PokemonActionCreators.setFilter(types))
        } catch (error) {
            dispatch(PokemonActionCreators.setError('Something went wrong. Try agian.'))
        }
    }
}