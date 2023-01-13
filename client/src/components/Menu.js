import Button from 'react-bootstrap/Button';
import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import NavDropdown from 'react-bootstrap/NavDropdown';

import 'bootstrap/dist/css/bootstrap.min.css';


import './Menu.css'

import { BsSearch } from 'react-icons/bs'
import {AiFillPlusSquare} from 'react-icons/ai'
import {FaUserCircle} from 'react-icons/fa'

import {NavLink} from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'


import { Context } from '../context/UserContext';
import api from '../api/Api';


const Menu = () => {
  const {authenticated, logout} = useContext(Context)

  

  
const navigate = useNavigate()
const [query,setQuery] = useState("")

const handleSubmit = (e) =>{
  e.preventDefault()
  if (query) {
    return navigate(`/search?q=${query}`);
  }
}


  return (
    
    <div className='menu'>
    
         <Navbar className='navbar justify-content-around' style={{backgroundColor:'#DC3535'}} variant="light"  expand="lg">
      <Container className='navbar h-100'>
        <Navbar.Brand className='div-logo'>
           <NavLink to="/" className='navLink '><b>!Go</b>Notícias </NavLink>
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" style={{color:'white'}}/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
          <Form className="d-flex" onSubmit={handleSubmit}>
            <Form.Control
              type="search"
              placeholder="Pesquise"
              className="me-2"
              aria-label="Search"
              onChange={(e)=>setQuery(e.target.value)}
            />
            <Button variant="outline-light" type="submit">
        <BsSearch />
      </Button>
      
            
          </Form>
          
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    <Nav
      className='justify-content-around nav-content '
     
    >
      <Nav.Item>
        
        <Nav.Link as={NavLink} to='/geek'>Geek</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={NavLink} to='/politica'>Política</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={NavLink} to='/internacional'>Internacional</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={NavLink} to='/esportes'>Esportes</Nav.Link>
      </Nav.Item>
      
      
     
      {authenticated ?
       (<>
        
        

        
          <div className='dropdown-profile-div'>
          
        <NavDropdown
              id="nav-dropdown-dark-example dropdown-profile"
              title='Perfil'
              menuVariant="light"
            >
              <Nav.Link as={NavLink} to='/user/myprofile'className="dropdown-profile">                 
                     <FaUserCircle /> Painel                 
              </Nav.Link>
              <Nav.Link as={NavLink} to='/user/create/post' className="dropdown-profile">                 
              <AiFillPlusSquare />  Criar Matéria 
              </Nav.Link>
              
              <Nav.Link>
              <Nav.Link onClick={logout}>Sair</Nav.Link>
              </Nav.Link>
              
            </NavDropdown>
            <Nav.Item className='link-profile'>
            
           </Nav.Item>
           
             

           </div>
       
     
       
        
        </>)
       :
       (<></>)}
       
    </Nav>
    <br />
    </div>
  )
}

export default Menu