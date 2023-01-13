import './style.css'

import { useState, useEffect } from 'react'

import useFlashMessage from '../../hooks/UseFlashMessage'
import Message from '../../components/Message';
import api from '../../api/Api'

import React, { useContext } from 'react'
import { Context } from '../../context/UserContext';
import { useNavigate, Navigate, NavLink } from 'react-router-dom';
import { BsFillTrashFill } from 'react-icons/bs'
import { BsFillPencilFill } from 'react-icons/bs'
import { GrConfigure } from 'react-icons/gr'
import { FcDataConfiguration } from 'react-icons/fc'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import Moment from 'react-moment';
import moment from 'moment';
import 'moment/locale/pt-br';



const Profile = () => {

  const { authenticated } = useContext(Context)
  const { setFlashMessage } = useFlashMessage()
  const navigate = useNavigate()


  const [user, setUser] = useState({})
  const [posts, setPosts] = useState([])
  const [token] = useState(localStorage.getItem('token') || '')




  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmpassword, setConfirmpassword] = useState("")
  const [image, setImage] = useState()

  // Modal State Edit Image 

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Modal State Edit Name 

  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  // Modal State Edit email 

  const [show3, setShow3] = useState(false);
  const handleClose3 = () => setShow3(false);
  const handleShow3 = () => setShow3(true);

  // Modal State Edit Password 

  const [show4, setShow4] = useState(false);
  const handleClose4 = () => setShow4(false);
  const handleShow4 = () => setShow4(true);

  if (!authenticated) {
    navigate('/login')
  }


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/users/checkuser', {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true
          },
        })
        setUser(res.data)
        setName(res.data.name)
        setEmail(res.data.email)
      } catch (error) {
        console.log(error)
      }

    }
    fetchData()

  }, [token])


  useEffect(() => {
    api
      .get('/posts/myrecentsposts', {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setPosts(response.data)
      })

  }, [token])

  const handleRecentSubmit = async (e) => {
    e.preventDefault()

    api.get('/posts/myrecentsposts', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    })
      .then((response) => {
        setPosts(response.data)
      })

  }

  const handleLastSubmit = async (e) => {
    e.preventDefault()

    api.get('/posts/myposts', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    })
      .then((response) => {
        setPosts(response.data)
      })

  }

  const handleRemove = async (_id) => {
    api.delete(`/posts/delete/${_id}`)
      .then(async () => {
        const res = await api
          .get('/posts/myrecentsposts', {
            headers: {
              Authorization: `Bearer ${JSON.parse(token)}`,
            },
          })
          .then((response) => {
            setPosts(response.data)
          })
      })
  }

  // Upadate Handle IMG

  async function updateUser(users) {
    let msgText = 'Editado'
    let msgType = 'success'

    const formData = new FormData()
    const userFormData = await Object.keys(users).forEach((key) =>
      formData.append(key, users[key]),
    )

    formData.append('users', userFormData)

    const data = await api
      .patch(`/users/edit/image/${user._id}`, formData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(async (response) => {
        console.log(response.data)
        const res = await api.get('/users/checkuser', {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true
          },
        })
        setUser(res.data)
        return response.data
      })
      .catch((err) => {
        console.log(err)
        msgText = err.response.data.message
        msgType = 'error'
        return err.response.data
      })
    setFlashMessage(msgText, msgType)
  }

  // Function Handle name

  async function updateUserName(users) {
    let msgText = 'Editado'
    let msgType = 'success'

    const data = await api
      .patch(`/users/edit/name/${user._id}`,users,{
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then(async (response) => {
        console.log(response.data)
        const res = await api.get('/users/checkuser', {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true
          },
        })
        setUser(res.data)
        setName(res.data.name)
        return response.data
      })
      .catch((err) => {
        console.log(err)
        msgText = err.response.data.message
        msgType = 'error'
        return err.response.data
      })
    setFlashMessage(msgText, msgType)
  }

   // Function Handle Email

   async function updateUserEmail(users) {
    let msgText = 'Editado'
    let msgType = 'success'
    
    const data = await api
      .patch(`/users/edit/email/${user._id}`,users,{
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then(async (response) => {
        console.log(response.data)
        const res = await api.get('/users/checkuser', {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true
          },
        })
        setUser(res.data)
        setEmail(res.data.email)
        return response.data
      })
      .catch((err) => {
        console.log(err)
        msgText = err.response.data.message
        msgType = 'error'
        return err.response.data
      })
    setFlashMessage(msgText, msgType)
  }

  // Update User Password

  async function updateUserPassword(users) {
    let msgText = 'Editado'
    let msgType = 'success'
    
    const data = await api
      .patch(`/users/edit/password/${user._id}`,users,{
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then(async (response) => {
        console.log(response.data)
        const res = await api.get('/users/checkuser', {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true
          },
        })
        return response.data
      })
      .catch((err) => {
        console.log(err)
        msgText = err.response.data.message
        msgType = 'error'
        return err.response.data
      })
    setFlashMessage(msgText, msgType)
  }


  const handleEditImg = async (e) => {
    e.preventDefault()
    const users = {
      image
    }
    updateUser(users)
  }

  const handleEditName = async (e) => {
    e.preventDefault()
    const users = {
      name
    }
    updateUserName(users)
  }

  const handleEditEmail = async (e) => {
    e.preventDefault()
    const users = {
      email
    }
    updateUserEmail(users)
  }

  const handleEditPassword = async (e) => {
    e.preventDefault()
    const users = {
      password,
      confirmpassword
    }
    updateUserPassword(users)
  }

   const [show5, setShow5] = useState(false);

  const handleClose5 = () => setShow5(false);
  const handleShow5 = () => setShow5(true);

  const numArrow = posts.length



  return (
    <Container className='body-profile'>



      <br></br>



      <div>
        <div>


        </div>

        {user && (

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
                    

                    <Dropdown as={ButtonGroup}>
                    <Button variant='danger'><BsFillPencilFill /> Editar Perfil</Button>
                  <Dropdown.Toggle split variant="danger" id="dropdown-split-basic" />

                  <Dropdown.Menu>
                    <Dropdown.Item  onClick={handleShow}>Imagem de Perfil</Dropdown.Item>
                    <Dropdown.Item onClick={handleShow2}>Nome</Dropdown.Item>
                    <Dropdown.Item onClick={handleShow3}>Email</Dropdown.Item>
                    <Dropdown.Item onClick={handleShow4}>Senha</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>



                  </div>
                </div>
              </Col>
            </Row>
            <br></br>

            {/* Modal Edit Image */}

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>{user.name}</Modal.Title>
              </Modal.Header>
              <Modal.Body>

                <Message />

                <Form onSubmit={handleEditImg}>
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Selecione uma imagem</Form.Label>
                    <Form.Control type="file" name="image" onChange={e => setImage(e.target.files[0])} />
                  </Form.Group>
                  
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Cancelar
                    </Button>
                    <Button variant="danger" type='submit'>
                      Salvar
                    </Button>
                  </Modal.Footer>
                </Form>
              </Modal.Body>

            </Modal>

            {/* Modal Edit Image */}


            {/* Modal Edit Name */}
            <Modal show={show2} onHide={handleClose2}>
              <Modal.Header closeButton>
                <Modal.Title>{user.name}</Modal.Title>
              </Modal.Header>
              <Modal.Body>

                <Message />

                <Form onSubmit={handleEditName}>
                  <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control type="text" value={name} name={name} onChange={(e) => setName(e.target.value)} placeholder="Nome" />
                  </Form.Group>           
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose2}>
                      Cancelar
                    </Button>
                    <Button variant="danger" type='submit'>
                      Salvar
                    </Button>
                  </Modal.Footer>
                </Form>
              </Modal.Body>
            </Modal>
            {/* Modal Edit Name */}

            {/* Modal Edit Email */}
            <Modal show={show3} onHide={handleClose3}>
              <Modal.Header closeButton>
                <Modal.Title>{user.name}</Modal.Title>
              </Modal.Header>
              <Modal.Body>

                <Message />

                <Form onSubmit={handleEditEmail}>
                  <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" value={email} name={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                  </Form.Group>           
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose3}>
                      Cancelar
                    </Button>
                    <Button variant="danger" type='submit'>
                      Salvar
                    </Button>
                  </Modal.Footer>
                </Form>
              </Modal.Body>
            </Modal>
            {/* Modal Edit Email */}

            {/* Modal Edit Password */}
            <Modal show={show4} onHide={handleClose4}>
              <Modal.Header closeButton>
                <Modal.Title>{user.name}</Modal.Title>
              </Modal.Header>
              <Modal.Body>

                <Message />

                <Form onSubmit={handleEditPassword}>
                  <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control type="password" value={password} name={password}
                     onChange={(e) => setPassword(e.target.value)} placeholder="Senha" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Confirmar Senha</Form.Label>
                    <Form.Control type="password" value={confirmpassword} name={confirmpassword} 
                    onChange={(e)=> setConfirmpassword(e.target.value)} placeholder="Confirm Senha" />
                  </Form.Group>            
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose4}>
                      Cancelar
                    </Button>
                    <Button variant="danger" type='submit'>
                      Salvar
                    </Button>
                  </Modal.Footer>
                </Form>
              </Modal.Body>
            </Modal>
            {/* Modal Edit Password */}

            <Row className='row-materias'>
              <Col>
                {user.eAdmin == true ?
                  (
                    <>
                      <Button as={NavLink} to='/user/admin/config'
                        variant="danger">
                        <FcDataConfiguration /> Confgurações De Usuário</Button>
                      <br />
                      <br />
                    </>
                  )

                  :
                  (<></>)
                }


                <h4>Matérias Publicadas: <b>{numArrow}</b> </h4>

                <br />
                <Dropdown as={ButtonGroup}>
                  <Button variant="danger">Ordenar Por:</Button>
                  <Dropdown.Toggle split variant="danger" id="dropdown-split-basic" />

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={handleRecentSubmit}>Recentes</Dropdown.Item>
                    <Dropdown.Item onClick={handleLastSubmit}>Antigos</Dropdown.Item>

                  </Dropdown.Menu>
                </Dropdown>



                {posts && posts.map((post) => (
                  <div>
                    <div className='box-recomendados' key={post._id}>
                      <img src={`${process.env.REACT_APP_API_URL}images/posts/${post.image}`} alt={post.titulo} />
                      <NavLink id='nav-rec' to={`/${post.slug}`}><h4>{post.titulo.substring(0, 60)}...</h4></NavLink>

                      <div className='div-delete-button'>
                        <Button variant="danger">
                          <NavLink to={`/user/edit/post/${post._id}`}><BsFillPencilFill /></NavLink>
                        </Button>
                      </div>
                      -
                      <div className='div-delete-button'>
                        <Button variant="danger" onClick={() => handleShow5(true)}><BsFillTrashFill /></Button>
                      </div>
                    </div>

                    
                              {/* Modal Confirm Delete */}
                              <Modal show={show5} onHide={handleClose5}>
                                <Modal.Header closeButton>
                                  <Modal.Title>Tem certeza deseja excluir essa matéria?</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>(As ações não poderão ser revertidas)</Modal.Body>
                                <Modal.Footer>
                                  <Button variant="secondary" onClick={handleClose5}>
                                    Cancelar
                                  </Button>
                                  <Button variant="danger" onClick={() => { handleClose5(true);handleRemove(post._id) }}>
                                    Excluir
                                  </Button>
                                </Modal.Footer>
                              </Modal>
                              {/* Modal Confirm Delete */}

                  </div>

                  

                ))}


              </Col>
            </Row>

          </div>



        )}
      </div>





    </Container>
  )
}

export default Profile