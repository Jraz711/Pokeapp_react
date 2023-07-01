import { useRef } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import footer_img from "../assets/images/footerpokedex.svg"
import title_pokedex from "../assets/images/pokedex.png"
import { setTrainerNameGlobal } from "../store/slices/trainerName.slice"
import "./styles/home.css"

const Home = () => {

  const trainerNameValue = useRef()


  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(setTrainerNameGlobal(trainerNameValue.current.value.trim()))
    navigate('/pokedex')
  }



  return (
    <div className="home">
      <header className="home_header">
        <div>
          <img className="home_header-img" src={title_pokedex} alt="" />
        </div>
      </header>
      <section className="home_section">
        <h2 className="home_title"> ! Hola Entrenador !</h2>
        <p className="home_subtitle">Para poder comenzar, dame tu nombre</p>
        <form onSubmit={handleSubmit}>
          <input className="input_form" ref={trainerNameValue} type="text" placeholder="Tu Nombre... " />
          <button className="home_btn">Comenzar</button>
        </form>
      </section>
      <footer className="home_footer">
        <div>
          <img className="home_footer-img" src={footer_img} alt="" />
        </div>
      </footer>
    </div>
  )
}

export default Home