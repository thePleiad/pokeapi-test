import React from 'react'
import './style.css'

const PokemonDetails = ({ currentPokemon }) => {
  return (
    <div className='chosen'>

      <img src={currentPokemon?.sprites?.other?.['official-artwork']?.front_default || currentPokemon?.sprites?.front_default} alt="" />
      <h3>{currentPokemon?.name} #{currentPokemon?.order}</h3>

      <div className='pokedata'>

        <div className='pokedata--types'>
          <div className='pokedata--types--title'>Type</div>
          <div className='pokedata--types--types'>
            {currentPokemon?.types?.map(t => (
              <div className='pokedata--types--type' key={t.slot}>{t.type.name}</div>
            ))}
          </div>
          
        </div>

        {currentPokemon?.stats?.map((s, i) => (
          <div key={i} className='pokedata--stats'>
            <div className='pokedata--stats--title'>{s.stat.name}</div>
            <div className='pokedata--stats--stat'>{s.base_stat}</div>
          </div>
        ))}

        <div className='pokedata--stats'>
          <div className='pokedata--stats--title'>Weight</div>
          <div className='pokedata--stats--stat'>{currentPokemon?.weight}</div>
        </div>
        
        <div className='pokedata--stats'>
          <div className='pokedata--stats--title'>Total moves</div>
          <div className='pokedata--stats--stat'>{currentPokemon?.moves?.length}</div>
        </div>

      </div>

    </div>
  )
}

export default PokemonDetails