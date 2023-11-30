import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import '../components/PokeInfoPage/stylesInfo/PokeInfoPage.css'

const PokeInfoPage = () => {

  const { id } = useParams()

  const url = `https://pokeapi.co/api/v2/pokemon/${id}`
  const [pokemon, getPokemon] = useFetch(url)

  useEffect(() => {
    getPokemon()
  }, [id])

 

  return (
    <article className='pokeinfo__article'>
     <section className='pokeinfo__main'>
      <header className={`pokeinfo__header ${pokemon?.types[0].type.name}-gradient`}>
        <img className="pokeinfo__img" src={pokemon?.sprites.other["official-artwork"].front_default} alt="" />
      </header>
      <div>
        <h1>{pokemon?.name}</h1>
        <hr />
        <ul>
          <li>
            <span>Heignt</span>
            <span>{pokemon?.height} "</span>
          </li>
          <li>
            <span>Weight</span>
            <span>{pokemon?.weight} lb</span>
          </li>
        </ul>
      </div>
      <section className='pokeinfo__type'>
        <article>
          <h2>Type</h2>
          <span>{pokemon?.types[0].type.name}</span>
          <span>{pokemon?.types[1].type.name}</span>
        </article>
        <article>
          <h2>Skills</h2>
          <span>{pokemon?.abilities[0].ability.name}</span>
          <span>{pokemon?.abilities[1].ability.name}</span>
        </article>
      </section>
      <section>
        <h2>Stats</h2>
        <div>
          <span>{pokemon?.stats[0].stat.name}</span><span>{pokemon?.stats[0].base_stat}/150</span>
          <div></div>
        </div>
        <div>
          <span>{pokemon?.stats[1].stat.name}</span><span>{pokemon?.stats[1].base_stat}/150</span>
          <div></div>
        </div>
        <div>
          <span>{pokemon?.stats[2].stat.name}</span><span>{pokemon?.stats[2].base_stat}/150</span>
          <div></div>
        </div>
        <div>
          <span>{pokemon?.stats[3].stat.name}</span><span>{pokemon?.stats[3].base_stat}/150</span>
          <div></div>
        </div>
        <div>
          <span>{pokemon?.stats[4].stat.name}</span><span>{pokemon?.stats[4].base_stat}/150</span>
          <div></div>
        </div>
        <div>
          <span>{pokemon?.stats[5].stat.name}</span><span>{pokemon?.stats[5].base_stat}/150</span>
          <div></div>
        </div>
        
      </section>
      </section>
      <section className='pokeinfo__movements'>
        <h2>Movements</h2>
      </section>
    </article>
  )
}

export default PokeInfoPage