import React, { useContext } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import Message from '../../components/Message';
import './CreateUser.css'

import { useState } from 'react'
import Api from '../../api/Api';

import { Context } from '../../context/UserContext';

import {FaUserCircle} from 'react-icons/fa'

const CreateUser = () => {

    const [name, setName] =  useState("")
    const [email, setEmail] =  useState("")
    const [password, setPassword] =  useState("")
    const [confirmpassword, setConfirmpassword] =  useState("")

    const { register } = useContext(Context)

    const handleSubmit = async(e)=>{
        e.preventDefault()
        const user = {
            name,
            email,
            password,
            confirmpassword
        }

        register(user)
    }

  return (
    <div className='body-login'>
      <br />
      
        <Form className='form-user' id='form-create-user' onSubmit={handleSubmit}>
        <div className='top-login'>
                   <div className='top-login-img'>
                     <FaUserCircle />
                   </div>
                   
                </div>
                <h1>Crie Sua Conta ;)</h1>
                <hr></hr>
     <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Nome</Form.Label>
        <Form.Control type="text" name={name} onChange={(e) => setName(e.target.value)} placeholder="Nome" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" name={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail"  />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Senha</Form.Label>
        <Form.Control type="password" name={password} onChange={(e) => setPassword(e.target.value)} placeholder="Senha"  autocomplete="of" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicConfirmPassword" >
        <Form.Label>Confirme Sua Senha</Form.Label>
        <Form.Control type="password" name={confirmpassword} onChange={(e) => setConfirmpassword(e.target.value)} placeholder="Confirme Sua Senha"   autocomplete="of" />
      </Form.Group>
      <Message />
      <Button variant="danger" type="submit">
                    Cadastrar
      </Button>
      
    </Form>
    <br />
    <br />
    <br />
    </div>
  )
}

export default CreateUser