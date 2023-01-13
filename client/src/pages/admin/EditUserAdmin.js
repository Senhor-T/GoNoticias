import React from 'react'
import { useState, useEffect } from 'react'


import './style.css'

import 'bootstrap/dist/css/bootstrap.min.css';
import api from '../../api/Api';

import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';

import { useNavigate, useParams } from 'react-router-dom'
import useFlashMessage from '../../hooks/UseFlashMessage'
import Message from '../../components/Message';

import Moment from 'react-moment';
import moment from 'moment';
import 'moment/locale/pt-br';

import {BsFillPencilFill} from 'react-icons/bs'

const EditUserAdmin = () => {

  const [token] = useState(localStorage.getItem('token') || '')
  const { setFlashMessage } = useFlashMessage()
  const navigate = useNavigate()

  const [users, setUsers] = useState([])
  const [admin, setAdmin] = useState('')
  const [posts, setPosts] = useState([])
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [modalData, setModalData] = useState(null)
  const [modalDataPost, setModalDataPost] = useState(null)
  

  useEffect(() => {
    api.get('/users/get/user')
      .then((response) => {
        setUsers(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [token])




  const handleEditSubmit = async (_id, aAdmin, eAdmin) => {
    api.patch(`/users/edit/admin/${_id}`, {
      admin: aAdmin || eAdmin
    })
      .then((response) => {
        console.log(response.data)
        api.get('/users/get/user')
      .then((response) => {
        setUsers(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
        return response.data
      })

  }

  const handleRecentSubmit = async (_id) => {
    api.get(`/users/${_id}`)
      .then((response) => {
        setPosts(response.data.postsRecent)
      })
  }

  let aAdmin = "1"
  let eAdmin = "0"

  const [idUser,setIdUser] = useState('')


  const handleRemoveAdmin = async (_id) => {
    api.delete(`/posts/admin/delete/${_id}`)
      .then(async () => {
        await api.get(`/users/${idUser}`)
        .then((response) => {
          setPosts(response.data.postsRecent)
        })
      })
  }


  const [show2, setShow2] = useState(false);

  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);


  return (
    <div>
      <br />
      <br />
      <div className='admin-painel-user'>
        <h3>Usuários Cadastrados</h3>
        <ul>

          <div>
            <Table striped bordered hover responsive size='sm'>
              <thead className='bg-danger text-white'>
                <tr>
                  <th>ID</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Data de Criação</th>
                  <th>Acesso</th>
                  <th>Ações</th>
                  <th>Matérias</th>
                </tr>
              </thead>
              

              
              {users && users.map((user) => (
                <tbody>
                  <tr key={user._id}>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td><Moment format="DD/MM/YYYY">{user.createdAt}</Moment></td>
                    <td>{user.admin == 1 ?
                    (<p>Create</p>)
                    :
                    (<p>Comum</p>)
                  } </td>
                    <th><Dropdown as={ButtonGroup}>
                      <Button variant="warning" className='text-white'>Definir Acesso</Button>
                      <Dropdown.Toggle variant="warning" className='text-white' id="dropdown-split-basic" />
                      <Dropdown.Menu>

                        <Dropdown.Item onClick={() => handleEditSubmit(user._id, aAdmin)}>Create</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleEditSubmit(user._id, eAdmin)}>Comum</Dropdown.Item>

                      </Dropdown.Menu>
                    </Dropdown></th>
                    <th>

                      <>
                        <Button variant="danger" onClick={() => { handleRecentSubmit(user._id); handleRecentSubmit(user._id); handleShow(true); setModalData(user); setModalDataPost(posts) }}>
                          <BsFillPencilFill /> Ver
                        </Button>

                        <Modal show={show} onHide={handleClose}>
                          <Modal.Header closeButton>
                            <Modal.Title>{show === true ? <>Matérias de: <b>{modalData.name}</b></> : <></>} </Modal.Title>
                          </Modal.Header>
                          {posts && posts.map((post) => (

                            <Modal.Body>
                              {/* Modal Confirm Delete */}
                              <Modal show={show2} onHide={handleClose2}>
                                <Modal.Header closeButton>
                                  <Modal.Title>Tem certeza deseja excluir essa matéria?</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>(As ações não poderão ser revertidas)</Modal.Body>
                                <Modal.Footer>
                                  <Button variant="secondary" onClick={handleClose2}>
                                    Cancelar
                                  </Button>
                                  <Button variant="danger" onClick={() => { handleClose2(true);handleRemoveAdmin(modalDataPost._id) }}>
                                    Excluir
                                  </Button>
                                </Modal.Footer>
                              </Modal>
                              {/* Modal Confirm Delete */}
                              <Table striped bordered hover responsive size='sm'>
                                <thead className='bg-danger text-white'>
                                  <tr>
                                    <th>ID</th>
                                    <th>Titulo</th>
                                    <th>Data de Criação</th>
                                    <th>Ações</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr key={post._id}>
                                    <td>{post._id}</td>
                                    <td>{post.titulo}</td>
                                    <td><Moment format="DD/MM/YYYY">{post.createdAt}</Moment></td>
                                    <td><Button variant='danger' onClick={()=>{handleShow2(true); setIdUser(modalData._id);setModalDataPost(post)}}>Excluir</Button></td>
                                  </tr>
                                </tbody>
                              </Table>
                            </Modal.Body>
                          ))}
                        </Modal>

                      </>


                    </th>
                  </tr>

                </tbody>
              ))}
              
            </Table>


          </div>

          <br />
        </ul>
      </div>
    </div>
  )
}

export default EditUserAdmin