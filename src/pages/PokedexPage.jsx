import { useSelector } from "react-redux"
import useFetch from "../hooks/useFetch"
import { useEffect, useRef, useState } from "react"
import PokeCard from "../components/PokedexPage/PokeCard"
import SelectType from "../components/PokedexPage/SelectType"
import '../components/PokedexPage/styles/PokedexPage.css'

const PokedexPage = () => {
  
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);

  const [inputValue, setInputValue] = useState('')
  const [selectValue, setSelectValue] = useState('allPokemons')

  const trainerName = useSelector(store => store.trainerName)

  const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  const [pokemons, getPokemons, getByTypePokemon, getPokemonWithPagination ] = useFetch(url)

  

  const handleLimitChange = (newLimit) => {
      setLimit(newLimit);
      setOffset(0); // Reset offset when changing the limit
  };

  const handlePageChange = (newOffset) => {
      setOffset(newOffset)
      if (selectValue === 'allPokemons') {
        getPokemonWithPagination(limit, newOffset);
    } else {
        getByTypePokemon(selectValue, limit, newOffset);
    }
  }

  /*useEffect(() => {
    if (selectValue === 'allPokemons') {
      getPokemons()
    } else {
      getByTypePokemon(selectValue)
    } 
  }, [selectValue])*/

  useEffect(() => {
    // Fetch data with pagination
    if (selectValue === 'allPokemons') {
      getPokemonWithPagination(limit, offset)
    } else {
        getByTypePokemon(selectValue, limit, offset);
    }
}, [selectValue, limit, offset]);

useEffect(() => {
  // Fetch data when limit changes
  if (selectValue === 'allPokemons') {
    getPokemonWithPagination(limit, offset);
  } else {
    getByTypePokemon(selectValue, limit, offset);
  }
}, [limit]);

  const inputSearch = useRef()

  const handleSubmit = e => {
    e.preventDefault()
    setInputValue(inputSearch.current.value.toLowerCase().trim())
    inputSearch.current.value = ''
  }

  const cbfilter = (poke) => {
    //filtro por nombre en el input
    const nameFiltered = poke.name.includes(inputValue)
    return nameFiltered
  }

  return (
    <div className="pokedex__page">
      <p>welcome <span>{trainerName}</span>, here select your favorite pokemon, let's go!</p>
      <form onSubmit={handleSubmit}>
        <input ref={inputSearch} type="text" />
        <button>Search</button>
      </form>
      <div>
        <SelectType
          setSelectValue={setSelectValue} />
      </div>
      <div className="pagination__controls">
        <label>Limit:</label>
        <select value={limit} onChange={(e) => handleLimitChange(Number(e.target.value))}>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
        <button onClick={() => handlePageChange(offset - limit)} disabled={offset === 0}>
          Previous
        </button>
        <button onClick={() => handlePageChange(offset + limit)}>
          Next
        </button>
      </div>
      <div className="poke__card-container">
        {
          pokemons?.results.filter(cbfilter).map(poke => (
            <PokeCard
              key={poke.url}
              url={poke.url}
            />
          ))
        }
      </div>
    </div>
  )
}

export default PokedexPage