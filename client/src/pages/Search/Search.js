import React from 'react'

import { useSearchParams, NavLink } from 'react-router-dom'
import api from '../../api/Api'
import { useState,useEffect } from 'react'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from 'react-router-dom';
import { useQuery } from "../../hooks/useQuery";


import './Search.css'
import Menu from '../../components/Menu';



const Search = () => {
const [searchParams] = useSearchParams()
const [searchPost,setSearchPost] = useState([])
const query = useQuery();
const search = query.get("q");


useEffect(()=>{
  const fetchData = async ()=>{
    try{
       await api.get(`/posts?${searchParams}`)
      .then((response)=>{
        setSearchPost(response.data)
        
      })
     
    }catch(error){
      console.log(error)
      
    }
  }
  fetchData()
},[searchParams])

const numArrows = searchPost.length

  return (
    <div className='center-search'>
    
       <h2>Você está buscando por: {search}</h2>
        <h2><b>{numArrows} notícias</b> encontradas</h2>
        <Container>
                <Row className='row-recomendados'>
                    <hr></hr>
                    {searchPost && searchPost.map(posts =>(
                        <Col lg={12} sm={12}>
                        <div className='box-recomendados'>
                            <img src={`${process.env.REACT_APP_API_URL}/images/posts/${posts.image}`} alt={posts.titulo} />
                            <NavLink to={`/${posts.slug}`}><h4>{posts.titulo.substring(0, 72)}</h4></NavLink>
                        </div>
                        </Col>
                    ))}
                    
                    
                </Row>
            </Container>

    </div>
  )
}

export default Search