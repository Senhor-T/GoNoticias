import React from 'react'
import { useParams } from "react-router-dom"
import { useEffect, useState} from 'react'


import api from '../api/Api'


const Favoritos = () => {

  const {id} = useParams()


  const [user,setUser] = useState([])
  const [post,setPost] = useState([])

  const [loading,setLoading] = useState(false)

  //  const [fav, setFavId] = useState("")

   const fav = user.favoritos
  

  useEffect(()=>{
    const fetchData = async ()=>{
      setLoading(true)
      try{
        const res = await api.get(`/users/favoritos/${id}`)
        setUser(res.data)
      }catch (error){
        console.log(error)
      }
      setLoading(false)
    }
    fetchData()
  },[])




    const handleSubmit = async (e) =>{
      e.preventDefault()
      const render = await api.post('/posts',{
        fav
      })
      setPost(render.data)
      
      
      .then(async ()=>{
        //  const res = await api.get('/posts')
        // console.log(res.data.titulo)
        //  setPost(res.data)
      })
      .catch((error)=>{
        console.log(error)
      })
    }


  

  



  return (
    <div>

    <h1>User</h1>
      
      {user && (
        <li>
          <h3>{user.name}</h3>
          <form onSubmit={handleSubmit}>
          {/* <input type='text' onChange={(e)=> setFavId(e.target.value)} value={fav} /> */}
          <input type='submit' value="Criar" />
          </form>
          </li>
      )}

      {post && post.map((posts)=>(
        <li key={posts._id}>
          <h3>{posts.titulo}</h3>
        </li>
      ))}
      
    </div>
  )
}

export default Favoritos