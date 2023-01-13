import React from 'react'

import { useState, useEffect } from 'react'
import { NavLink, useParams } from "react-router-dom"
import api from '../../api/Api'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';

import Moment from 'react-moment';
import moment from 'moment';
import 'moment/locale/pt-br';


const Users = () => {

    const {id} = useParams()
    const [posts,setPosts] = useState([])
    const [user,setUser] = useState({})


    useEffect(()=>{
        const fetchData = async ()=>{ api.get(`/users/${id}`)
        .then((response)=>{
            setPosts(response.data.postsRecent)
            setUser(response.data.user)
        })
        .catch((error)=>{
            console.log(error)
        })
    }
    fetchData()

    },[])

    const handleRecentSubmit = async (e)=>{
        e.preventDefault()       
        api.get(`/users/${id}`)
          .then((response)=>{
            setPosts(response.data.postsRecent)
          })       
      }
    
      const handleLastSubmit = async (e)=>{
        e.preventDefault()
        
        api.get(`/users/${id}`)
          .then((response)=>{
            setPosts(response.data.posts)
          })
        }        

  

  return (
    <Container className='body-profile'>

      <br></br>

      

      {user &&(
         <div>
         <Row>

           <Col className='col-profile' lg={8}>
             <div className='div-img-profile'>

               <img src={`${process.env.REACT_APP_API_URL}/images/users/${user.image}`} alt='profile-photo' />
              <br />
              <br />
               <div className='div-user-sobre'>
               <h4>{user.name}</h4>
                 <p><b>Desde:</b> <Moment format="DD/MM/YYYY">{user.createdAt}</Moment> </p>
               </div>
             </div>
           </Col>
         </Row>
         <br></br>
         <Row className='row-materias'>
                <Col>
                  <h4>Matérias</h4>
                  <br />
                  <Dropdown as={ButtonGroup}>
                  <Button variant="danger">Ordenar Por:</Button>
                  <Dropdown.Toggle split variant="danger" id="dropdown-split-basic" />

                    <Dropdown.Menu>
                      <Dropdown.Item onClick={handleRecentSubmit}>Recentes</Dropdown.Item>
                      <Dropdown.Item onClick={handleLastSubmit}>Antigos</Dropdown.Item>
                      
                    </Dropdown.Menu>
                  </Dropdown>
                  <br></br>
                  

                  {posts && posts.map((post) => (
                    <div>
                        
                    <div className='box-recomendados' key={post._id}>
                      <img src={`${process.env.REACT_APP_API_URL}images/posts/${post.image}`} alt={post.titulo} />
                      <NavLink to={`/${post.slug}`}><h4>{post.titulo}</h4></NavLink> 
                      <p>|há <Moment moment-timezone fromNow ago >{post.createdAt}</Moment> </p>
                                   
                    </div>
                    
                    </div>
                  ))}
                  

                </Col>
              </Row>
         </div>
      )}
         

        

        

      


    </Container>
  )
}

export default Users