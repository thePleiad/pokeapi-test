import React, { useEffect, useRef, useState } from 'react'
import {useActions} from '../../hooks/useActions'
import {useSelector} from 'react-redux'
import PokemonCard from '../PokemonCard/PokemonCard'
import PokemonDetails from '../PokemonDetails/PokemonDetails'
import PokeService from '../../api/PokeService'
import './style.css'

function Home() {
    const {loadNextBatchOfPokemons, toogleFilter, loadAllPokemons} = useActions()
    const {pokemons, isLoading, currentPokemon, error, filter} = useSelector(state => state.pokedex)
    const [offset, setOffset] = useState(0)
    const [types, setTypes] = useState([])
    const buttons = useRef(0)
    const [filterLocal, setFilterLocal] = useState([])
    const [isAllLoaded, setIsAllLoaded] = useState(false)

    useEffect(() => {
      loadMore(offset)
      loadPokemonTypes()
    }, [])

    useEffect(() => {
      setOffset(pokemons.length)
    }, [pokemons])

    const loadMore = async (offset) => {
      if (offset > pokemons.length) {
        console.log(`limit reached ${pokemons.length}`);
        setIsAllLoaded(true)
        return
      }
      setFilterLocal([])
      toogleFilter(filterLocal)
      await loadNextBatchOfPokemons(offset)
      // setOffset(offset += 12)
    }

    const loadPokemonTypes = async () => {
      const response = await PokeService.getTypes()
      const data = response.data.results.map(t => t.name)
      setTypes(data)
    }

    const addFilter = (type, e) => {
      e.target.classList.toggle('checked')
      if(filterLocal.includes(type)) {
        setFilterLocal(filterLocal.filter(t => t !== type))
      } else {
        setFilterLocal([...filterLocal, type])
      }
    }

    const applyFilter = (types) => {
      toogleFilter(types)
      Array.from(buttons.current.children).map(b => b.classList.remove('checked'))
      setFilterLocal([])
    }

    const loadAll = async (offset) => {
      if (offset > pokemons.length) {
        console.log(`limit reached ${pokemons.length}`);
        return
      }
      setFilterLocal([])
      toogleFilter(filterLocal)
      await loadAllPokemons(offset)
      setIsAllLoaded(true)
    }

  return (
    <>
        <main className='container'>
          <div>
            {error && <h1 id='error'>{error}</h1>}  
            {/* <button onClick={() => {console.log(pokemons, offset)}}>test load</button>  */}
            {/* <button onClick={() => {console.log(currentPokemon)}}>test current</button>  */}
            {/* <button onClick={() => {console.log(filterLocal, filter)}}>test filter</button>  */}

            <h1 id='title'>Pokedex</h1>

            <section className='filter--section'>
              <div className='filters' ref={buttons}>
                {types.map((f,i) => <button key={i} onClick={(e) => addFilter(f, e)} value={f}>{f}</button>)}
              </div>
              <button onClick={() => applyFilter(filterLocal)}>{filter.length >= 1 && filterLocal >= 1 ? 'Filter' : filter.length >= 1 && filterLocal.length === 0 ? 'Reset' : 'Filter'}</button>
            </section>

          </div>
          <section className='pokemon--section'>

            <div className='pokemon-main'>
              <div className="pokemon-list">
                {pokemons.map((poke, i) => <PokemonCard key={i} url={poke.url} i={i}/>)}
              </div>
              
              {isLoading ? <h1 className='load'>Loading...</h1> :
              (<div className='load-buttons'>
                {!isAllLoaded && <button className='load' onClick={() => {loadMore(offset)}}>Load More</button>}
                {!isAllLoaded && <button className='load' onClick={() => {loadAll(offset)}}>Load All</button>}
              </div>)
              }
            </div>

          {currentPokemon.id && (
            <div className='pokemon-chosen'>
              <PokemonDetails currentPokemon={currentPokemon}/>
            </div>
          )}
          </section>
          
        </main>
         
    </>
  )
}

export default Home