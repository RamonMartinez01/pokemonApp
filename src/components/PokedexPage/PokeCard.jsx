import { useEffect } from "react"
import useFetch from "../../hooks/useFetch"
import { useNavigate } from "react-router-dom"
import './styles/PokeCard.css'

const PokeCard = ({ url }) => {

  const [infoPoke, getInfoPoke] = useFetch(url)

  useEffect(() => {
    getInfoPoke()
  }, [])

  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate(`/pokedex/${infoPoke.id}`)
  }

  console.log(infoPoke);
  return (
    <article className="pokecard" onClick={handleNavigate}>
      <header className="pokecard__header">
        <img className="pokecard__img" src={infoPoke?.sprites.other["official-artwork"].front_default} alt="" />
      </header>
      <section className="pokecard__body">
        <h3 className="pokecard__name">{infoPoke?.name}</h3>
        <ul className="pokecard__types">
          {
            infoPoke?.types.map(infoType => (
              <li className="pokecard__typename" key={infoType.type.url}>{infoType.type.name}</li>
            ))
          }
        </ul>
        <hr className="pokecard__hr" />
        <ul className="pokecard__stats">
          {
            infoPoke?.stats.map(infoStat => (
              <li className="pokecard__stat" key={infoStat.stat.url}>
                <span className="pokecard__stat-name" >{infoStat.stat.name}</span>
                <span className="pokecard__stat-value">{infoStat.base_stat}</span>
              </li>
            ))
          }
        </ul>
      </section>
    </article>
  )
}

export default PokeCard