import { NavLink, useParams } from "react-router-dom"
import { useEffect, useState } from 'react'
import api from "../../api/Api"
import { useFetch } from '../../hooks/useFetch';


import './Single.css'
import Container from "react-bootstrap/esm/Container"
import Col from "react-bootstrap/esm/Col"
import Row from "react-bootstrap/esm/Row"
import Moment from 'react-moment';
import 'moment/locale/pt-br';


import { ImWhatsapp } from 'react-icons/im'
import { BsTelegram } from 'react-icons/bs'
import { BsFacebook } from 'react-icons/bs'
import { BsTwitter } from 'react-icons/bs'
import Footer from "../../components/Footer";

const Single = () => {

    const { slug } = useParams()

    const [post, setPost] = useState([])
    const [user, setUser] = useState('')
    const { postRecente, postTop } = useFetch(api)


    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await api.get(`/${slug}`)
                setPost(res.data)

                const get = api.get(`/users/${res.data.user._id}`)
                .then((response) => {
                    console.log(response.data)
                    setUser(response.data.user)
                })
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])

console.log(user)


    return (

        <div>


            <Container>

                <Row>
                    <Col md={12} lg={12} sm={12} xs={12}>
                        {post && (

                            <div className="single-img">
                                <div className="single-title">
                                    <h1>{post.titulo}</h1>
                                    <p><Moment format="DD/MM/YYYY">{post.createdAt}</Moment> ás <Moment moment-timezone={'true'} format="HH:mm">{post.createdAt}</Moment></p>
                                </div>
                                <img id='imgPost' src={`${process.env.REACT_APP_API_URL}/images/posts/${post.image}`} alt={post.titulo} />
                                <div className="single-detalhes">
                                    <div className="share">
                                        <a target="_blank" rel="noopener noreferrer" href={`https://www.facebook.com/sharer/sharer.php?u=http://localhost:8080/${post.slug}`}>
                                            <BsFacebook />
                                        </a>
                                        <a target="_blank" rel="noopener noreferrer" href=
                                            {`https://t.me/share/url?url=${post.titulo}http://localhost:8080/${post.slug}`}>
                                            <BsTelegram />
                                        </a>
                                        <a target="_blank" rel="noopener noreferrer" href={`https://twitter.com/intent/tweet?text=${post.titulo}&url=http://localhost:8080/${post.slug}`}>
                                            <BsTwitter />
                                        </a>
                                        <a target="_blank" rel="noopener noreferrer" href={
                                            `https://api.whatsapp.com/send?text=${post.titulo}http://localhost:8080/${post.slug}`}>
                                            <ImWhatsapp />
                                        </a>

                                    </div>
                                    {user && (
                                        <div className="single-details">
                                            <h5>Por: <NavLink to={`/users/${user._id}`}><b>{user.name}</b></NavLink></h5>
                                            <div className="single-detalhes-img">
                                                <img src={`${process.env.REACT_APP_API_URL}/images/users/${user.image}`} alt='profile-photo' />
                                            </div>
                                        </div>
                                    )}



                                </div>
                                <br></br>
                                <div className="single-content">
                                    <div dangerouslySetInnerHTML={{ __html: post.conteudo }} />
                                </div>
                                <Container className="container-recomendados">
                                    <Row className='row-recomendados'>
                                        <hr />
                                        <h4>Leia Também:</h4>
                                        {postRecente && postRecente.slice(4, 12).map(posts => (
                                            <Col lg={12}>
                                                <div className='box-recomendados'>
                                                    <img src={`${process.env.REACT_APP_API_URL}images/posts/${post.image}`} alt={posts.titulo} />
                                                    <NavLink to={`/${posts.slug}`}><h4>{posts.titulo}</h4></NavLink>
                                                </div>
                                                <br />
                                                <br />
                                            </Col>
                                            
                                        ))}
                                       
                                    <Footer />

                                    </Row>
                                </Container>
                            </div>

                        )}

                    </Col>
                </Row>
                    
            </Container>

           

        </div>

    )
}

export default Single