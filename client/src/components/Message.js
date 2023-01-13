import { useState, useEffect } from 'react'
import bus from '../api/bus'

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

import styles from './Message.module.css'

function Message(){
    const [visibility, setVisibility] = useState(false)
    const [message, setMessage] = useState("")
    const [type, setType] = useState("")

    useEffect(()=>{

        bus.addListener('flash',({message, type})=>{

            setVisibility(true)
            setMessage(message)
            setType(type)

            setTimeout(()=>{
                setVisibility(false)
            },3000)

        })

    },[])

    if(type.error){
        console.log(type.error)
    }

    

    return(
        visibility &&(
            <div className={`${styles.message} ${styles[type]}`}>
            <Alert.Heading>{message}</Alert.Heading>
            </div>

            
        
    )
    )
}


export default Message