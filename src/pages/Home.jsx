import { useRef } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setTrainerNameGlobal } from "../store/slices/trainerName.slice"

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
    <div>
      <h1>Pokedex</h1>
      <h2>Hi Trainer !</h2>
      <p>To Start in this application, please, give me your trainer name.</p>
      <form onSubmit={handleSubmit}>
        <input ref={trainerNameValue} type="text" placeholder="Your Name" />
        <button>Catch them all</button>
      </form>
    </div>
  )
}

export default Home