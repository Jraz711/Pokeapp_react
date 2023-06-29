import axios from "axios"
import { useState } from "react"

const useFetch = (url) => {

  const [infoApi, setinfoApi] = useState()
  const [hashError, sethashError] = useState(false)
  const getApi = () => {
    axios.get(url)
      .then(res => {
        setinfoApi(res.data)
        sethashError(false)
      })
      .catch(err => {
        sethashError(true)
      })
  }

  return [infoApi, getApi, hashError]
}

export default useFetch