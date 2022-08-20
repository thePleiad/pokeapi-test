import React, { useEffect, useState } from 'react'
import {useActions} from '../../hooks/useActions'
import PokeService from '../../api/PokeService'
import { useSelector } from 'react-redux'
import './style.css'

function PokemonCard({url}) {
  const [pokemonData, setPokemonData] = useState({})
  const {filter} = useSelector(state => state.pokedex)
  const pokemonTypes = pokemonData?.types?.map((t) => t.type.name)

  // Create utils and move
  let test = filter.length === 1 ? filter.some(t => pokemonTypes?.includes(t)) : filter.length > 1 ? filter.every(t => pokemonTypes?.includes(t)) : true

  useEffect(() => {
    loadPokemonData((url))
  }, [url])
  const loadPokemonData = async (url) => {
    const response = await PokeService.getSinglePokemonData(url)
    const data = response.data
    setPokemonData(data)
  }
  

  const {selectPokemon} = useActions()
  if (test) return (
      <div onClick={() => selectPokemon(url)} className='card'>
        {/* <button onClick={() => {console.log(pokemonData, filter, test)}}>...</button> */}
        <img src={pokemonData?.sprites?.front_default} alt="" />
        <h4>{pokemonData?.name}</h4>
        <div className='card--types'>
          {pokemonTypes?.map((t, i) => <p key={i} about={t}>{t}</p>)}
        </div>
      </div>
  )
}

export default PokemonCard