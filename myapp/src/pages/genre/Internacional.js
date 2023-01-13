import React from 'react'

import { useState,useEffect } from 'react'
import { NavLink,useNavigate } from 'react-router-dom';
import api from '../../api/Api'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Slider from "react-slick";
import './style.css' 
import Footer from '../../components/Footer';

const Internacional = () => {

  const [post,setPost] = useState([])

  useEffect(()=>{
      const fetchData = async ()=>{
          const res = await api.get('/posts/genre/internacional')
          setPost(res.data)
      }
      fetchData()
  },[])


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

  const numArrows = post.length

  return (
    <div>
    <div className='div-back-img'>
        <br/>
        
        <h2>As Maiores Novidades no Mundo</h2>
        <p>Não perca nada, acesse já!</p>
        <div className='materias'>
        <h5><b>{numArrows}</b> Matérias Publicadas</h5>
        
        </div>
        
    </div>
    <Container id='container' >
    
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
                        <div className='recente'>
                            <img src={`${process.env.REACT_APP_API_URL}/images/posts/${posts.image}`} alt={posts.titulo} />
                            <NavLink to={`/${posts.slug}`}><h6>{posts.titulo}</h6></NavLink>
                        </div>
                    ))}
                </Col>
            </Row>
        </Container>
        <br></br>
        <br></br>
        <h2 className='title-recomendados'>Últimas Notícias</h2>
        <Container>
            <Row className='row-recomendados'>
                <hr></hr>
                {post && post.slice(6,15).map(posts =>(
                    <Col lg={12}>
                    <div className='box-recomendados'>
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

export default Internacional