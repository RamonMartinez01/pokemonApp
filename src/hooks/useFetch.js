import { useState } from "react"
import axios from 'axios'



const useFetch = (url) => {
 
    const [infoApi, setInfoApi] = useState()
    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(0)
   
    const getApi = () => {
        axios.get(url)
        .then(res => setInfoApi(res.data))
        .catch(err => console.log(err))
    }
    
    const getTypeApi = (urlType) => {
        axios.get(urlType)
        .then(res => {
            const obj = {
                results: res.data.pokemon.map(e => e.pokemon)
            }
            setInfoApi(obj)
        })
        .catch(err => console.log(err))
    }

    const getPokemonWithPagination = (limit, offset) => {
        const apiUrl = `${url}?limit=${limit}&offset=${offset}`
        axios.get(apiUrl)
            .then(res => setInfoApi(res.data))
            .catch(err => console.log(err))
    }
return [ infoApi, getApi, getTypeApi, getPokemonWithPagination ]
}

export default useFetch