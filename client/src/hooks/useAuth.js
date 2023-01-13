import api from "../api/Api";

import { useState, useEffect } from "react";
import { useNavigate,  } from 'react-router-dom'
import useFlashMessage from './UseFlashMessage'
import { redirect } from "react-router-dom";

export default function useAuth(){
    const [authenticated, setAuthenticated] = useState(false)
    const {setFlashMessage} = useFlashMessage()
    const navigate  = useNavigate ()

    useEffect(()=>{
        const token = localStorage.getItem('token')        
        if(token){
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
            setAuthenticated(true)
        }
    },[])


    async function register(user){

        let msgText = 'Cadastrado Com Sucesso!'
        let msgType = 'success'

        try{
            const data = await api.post('/users/register',user)
            .then((response)=>{
                return response.data
            })
           await authUser(data)
        }catch (error){ 
            msgText = error.response.data.message
             msgType = 'error'
        }

        setFlashMessage(msgText, msgType)

    }


    async function login(user){
        let msgText = 'Bem-Vindo!'
        let msgType = 'success'

        try{
            const data = await api.post('/users/login',user)
            .then((response)=>{
                return response.data
                
            })
            // await authUser(data)
            if(data){
                await authUser(data)
                window.location.reload();
            }
            
            
        }catch (error){
            msgText = error.response.data.message
            msgType = 'error'
        }

        setFlashMessage(msgText, msgType)

    }

    


    async function authUser(data){
        setAuthenticated(true)
        localStorage.setItem('token',JSON.stringify(data.token))
        navigate('/user/myprofile')
    }

    async function authUser2(data){
        setAuthenticated(true)
        localStorage.setItem('token',JSON.stringify(data.token))
        navigate('/')
    }


    
    function logout(){
        const msgText = 'Logout realizado com sucesso!'
        const msgType = 'success'

        setAuthenticated(false)
        localStorage.removeItem('token')
        api.defaults.headers.Authorization = undefined
        navigate('/')

        setFlashMessage(msgText,msgType)
    }

    return { authenticated, register, logout, login}
}
