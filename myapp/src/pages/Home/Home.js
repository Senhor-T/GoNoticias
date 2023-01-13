
import api from '../../api/Api'
import { useEffect, useState } from 'react'
import { NavLink,useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


import React from "react";
import Slider from "react-slick";
import Menu from '../../components/Menu';
import Button from 'react-bootstrap/Button';

import Moment from 'react-moment';
import moment from 'moment';
import 'moment/locale/pt-br';
import { useFetch } from '../../hooks/useFetch';

import Footer from '../../components/Footer';

const Home = () => {

    // const [post,setPost] = useState([])
    // const [postTop,setPostTop] = useState([])
    const [loading, setLoading] = useState(false)
    const [postTop,setPostTop] = useState([])
    const { postRecente: post } = useFetch(api)

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        cssEase: "linear",
        arrows: false
    };

    // const navigate = useNavigate()
    // const [query, setQuery] = useState()

    // // const handleSubmit = (e) =>{
    // //     e.preventDefault()

    // //     navigate(`/search?q=${query}`)
    // // }

    useEffect(()=>{
        const fetchData = async ()=>{
          try{
            const res = await api.get(`/posts-mais-vistos/month`)
            setPostTop(res.data)
          }catch(error){
            console.log(error)
          }
        }
        fetchData()
      },[])

    const handleRecentSubmit = async (e)=>{
        e.preventDefault()     
          api.get('/posts-mais-vistos/year')
          .then((response)=>{
            setPostTop(response.data)
          })
        
      }
    
      const handleLastSubmit = async (e)=>{
        e.preventDefault()
        
          api.get('/posts-mais-vistos/month')
          .then((response)=>{
            setPostTop(response.data)
          })
        
      }

    return (
        <div>

            
            {/* <form onSubmit={handleSubmit}>
        <input type="text" 
        onChange={(e) => setQuery(e.target.value)} />
        <input type="submit" value="Buscar" />
    </form> */}

            <Container style={{ marginTop: '5%' }}>
                <Row>
                    <Col className='col-img-top' lg={8}>
                        <div className='div-img' >
                            <div className="slider">

                                <Slider {...settings}>
                                    {post && post.slice(0, 3).map(posts => (
                                        <div key={posts._id}>

                                        <img className='img-top' alt={posts.titulo} src={`${process.env.REACT_APP_API_URL}/images/posts/${posts.image}`} />
                                        <NavLink to={`/${posts.slug}`}><h2>{posts.titulo.substring(0, 72)}</h2></NavLink>

                                        </div>
                                    ))}



                                </Slider>
                            </div>
                        </div>

                    </Col>

                    <Col className='col-mais-recentes' lg={4} >
                        <hr />
                        <br></br>
                        <br></br>
                        <br></br>

                        {post && post.slice(3, 6).map(posts => (
                            <div className='recente' key={posts._id}>
                                <img src={`${process.env.REACT_APP_API_URL}/images/posts/${posts.image}`} alt={posts.titulo} />
                                <NavLink to={`/${posts.slug}`}><h6>{posts.titulo}</h6></NavLink>
                            </div>
                        ))}



                    </Col>

                </Row>
            </Container>
            

            <div className='center' >
            <hr></hr>
                <h2>Populares</h2>
                <br />
                <Container className='container-mais'>
                <Button variant='danger' onClick={handleLastSubmit}>Mês</Button>              
                -
                <Button variant='danger' onClick={handleRecentSubmit}>Ano</Button>
                    <Row className='row-mais'>
                        
                        {postTop && postTop.map((posts) => (
                            <Col className='col-mais' md={6} sm={10} lg={6} xs={12} key={posts._id}>

                                <div className="box-ultima-single" >
                                    <div className='div-img-mais'>
                                    <img src={`${process.env.REACT_APP_API_URL}/images/posts/${posts.image}`} alt={posts.titulo} />
                                    </div>
                                    <div className="conteudo-noticia-single">
                                        <h4>
                                            <NavLink to={`/${posts.slug}`}>{posts.titulo.substring(0, 76)}</NavLink>
                                        </h4>
                                    </div>

                                </div>
                                
                                <p>há <Moment moment-timezone={"true"} fromNow ago >{posts.createdAt}</Moment> </p>
                                
                            </Col>
                        ))}


                    </Row>

                </Container>


            </div>
            <br></br>
            <br></br>
            <h2 className='title-recomendados'>Últimas Notícias</h2>
            <Container>
                <Row className='row-recomendados'>
                    <hr></hr>
                    {post && post.slice(6,15).map(posts =>(
                        <Col lg={12} key={posts._id}>
                        <div className='box-recomendados' >
                            <img src={`${process.env.REACT_APP_API_URL}/images/posts/${posts.image}`} alt={posts.titulo} />
                            <NavLink to={`/${posts.slug}`}><h4>{posts.titulo}</h4></NavLink>
                           
                        </div>
                        
                        </Col>
                        
                    ))}
                    
                    
                </Row>
            </Container>


            <Footer />



        </div>
    )
}

export default Home