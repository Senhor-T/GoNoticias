import api from '../../api/Api'
import {useState} from 'react'
import { useNavigate,  } from 'react-router-dom'
import useFlashMessage from '../../hooks/UseFlashMessage'

export default function PostAuth(){
    const [token] = useState(localStorage.getItem('token') || '')
    const {setFlashMessage} = useFlashMessage()
    const navigate  = useNavigate ()
  


    async function registerPost(post){
        let msgType = 'success'

        const formData = new FormData()
        const userFormData = await Object.keys(post).forEach((key) =>
        formData.append(key, post[key]),
      )
  
      formData.append('posts', userFormData)

      
        const data = await api.post(`/posts/create`,formData,{
          headers:{
              Authorization: `Bearer ${JSON.parse(token)}`,
              'Content-Type': 'multipart/form-data',
              "Access-Control-Allow-Origin" : "*", 
              "Access-Control-Allow-Credentials" : true 
          },
      })
      .then((response) =>{
          console.log(response.data)
          return response.data
      })
    
      .catch((error)=>{
        console.log(error)
        msgType = 'error'
        return error.response.data
      })
       
      

        
        setFlashMessage(data.message, msgType)
        navigate('/user/myprofile')
    }

    

    return {registerPost}
}