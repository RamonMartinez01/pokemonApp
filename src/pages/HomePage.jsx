import { useRef } from "react"
import { setTrainerName } from "../store/slices/trainerName.slice.js"
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import '../stylesPages/homePage.css'
import poketidex from '../assets/poketidex.png'


const HomePage = () => {

    const inputName = useRef()

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(setTrainerName(inputName.current.value.trim()))
        navigate('/pokedex')
    }

  return (
    <div className="homepage">
      <section className="homepage__start">
        <div className="home__img-container">
          <img className="home__img" src={poketidex} alt="" />
        </div>
        <h2>Hi Trainer!</h2>
        <p>To start, please give me your trainer name</p>
        <form className="home__form" onSubmit={handleSubmit}>
            <input className="home__input" ref={inputName} type="text" />
            <button className="home__btn">Catch them all!</button>
        </form>
      </section>
      <section className="home__footer">
        <div className="navbar__black"></div>
        <div className="navbar__red"></div>
      </section>
    </div>
  )
}

export default HomePage