import { useRef } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import icon from "../assets/images/group-217.svg"
import title_pokedex from "../assets/images/pokedex.png"
import "../components/styles/home.css"
import { setTrainerNameGlobal } from "../store/slices/trainerName.slice"

const Home = () => {

  const trainerNameValue = useRef()
  // const trainerName = useSelector(states => states.trainerName)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(setTrainerNameGlobal(trainerNameValue.current.value.trim()))
    navigate('/pokedex')
  }



  return (
    <div className="home">
      <img className="img-title_home" src={title_pokedex} alt="" />
      <h2 >Hi Trainer !</h2>
      <p>To Start in this application, please, give me your trainer name.</p>
      <form onSubmit={handleSubmit}>
        <input className="home-input" ref={trainerNameValue} type="text" placeholder="Your Name" />
        <button className="home-button">Catch them all</button>
      </form>
      <footer className="footer-home">
        <img src={icon} alt="" />
      </footer>
    </div>
  )
}

export default Home