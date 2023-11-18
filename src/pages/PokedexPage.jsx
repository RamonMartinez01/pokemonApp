import { useSelector } from "react-redux"
import useFetch from "../hooks/useFetch"
import { useEffect, useRef, useState } from "react"
import PokeCard from "../components/PokedexPage/PokeCard"
import SelectType from "../components/PokedexPage/SelectType"

const PokedexPage = () => {

  const [inputValue, setInputValue] = useState('')
  const [selectValue, setSelectValue] = useState('allPokemons')

  const trainerName = useSelector(store => store.trainerName)

  const url = 'https://pokeapi.co/api/v2/pokemon?limit=10&offset=0'
  const [ pokemons, getPokemons, getByTypePokemon ] = useFetch(url)

  useEffect(() => {
    if(selectValue=== 'allPokemons'){
    getPokemons()  
    }else{
      getByTypePokemon(selectValue)
    }
      
    
  }, [selectValue])
  
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
    <div>
      <p>welcome <span>{ trainerName }</span>, here select your favorite pokemon, let's go!</p>
      <form onSubmit={handleSubmit}> 
        <input ref={inputSearch} type="text" />
        <button>Search</button>
      </form>
      <SelectType
      setSelectValue={setSelectValue} />
      <div>
        {
          pokemons?.results.filter(cbfilter).map(poke =>(
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