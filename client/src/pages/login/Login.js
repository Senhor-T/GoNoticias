import React, { useContext } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';

import '../createUser/CreateUser.css'


import { useState } from 'react'

import { Context } from '../../context/UserContext';
import {FaUserCircle} from 'react-icons/fa'

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    
    const { login } = useContext(Context)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const user = {
            email,
            password
        }

        login(user)
    }

    return (
        
        <div className='body-login'>
            <br />
            <Form className='form-user'  onSubmit={handleSubmit}>
                <div className='top-login'>
                   <div className='top-login-img'>
                     <FaUserCircle />
                   </div>
                   
                </div>
                <h1>Login</h1>
                <hr></hr>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control type="password" name={password} onChange={(e) => setPassword(e.target.value)} placeholder="Senha" autocomplete="of" />
                </Form.Group>

                <div className='mb-3'>
                <Button variant="danger" type="submit">
                    Entrar
                </Button>
                </div>  

               
            </Form>
            <br />
            <br />
            <br />
        </div>
    )
}

export default Login