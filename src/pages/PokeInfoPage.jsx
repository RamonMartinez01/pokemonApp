import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch'

const PokeInfoPage = () => {

  const { id } = useParams()

  const url = `https://pokeapi.co/api/v2/pokemon/${id}`
  const [ pokemon, getPokemon ] = useFetch(url)

  useEffect(() => {
    getPokemon()
  }, [])

  return (
    <div>
      <h1>PokeInfoPage</h1>
    </div>
  )
}

export default PokeInfoPage