import {useState, useEffect} from 'react'
import api from '../api/Api'

export const useFetch = (api, token = null) =>{

  const [postRecente,setPostRecente] = useState([])
  const [postTop,setPostTop] = useState([])
  const [error,setError] = useState(null)

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }

  


  useEffect(()=>{
    const fetchData = async ()=>{
      try{
        const res = await api.get(`/posts-recentes`)
        setPostRecente(res.data)
      }catch (error){
        console.log(error)
        setError("Houve Algum Erro")
      }
    }
    fetchData()
  },[api])

  useEffect(()=>{
    const fetchData = async ()=>{
      try{
        const res = await api.get(`/posts-mais-vistos/month`)
        setPostTop(res.data)
      }catch(error){
        console.log(error)
        setError("Houve Algum Erro")
      }
    }
    fetchData()
  },[api])





  return{postRecente,postTop,error}
}