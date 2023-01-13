import React, { useState, useRef, useMemo, useContext, useEffect } from "react";
import JoditEditor from "jodit-react";
import "./style.css";
import api from "../../api/Api";
import Message from '../../components/Message';
import { Context } from "../../context/UserContext";
import Form from 'react-bootstrap/Form';

import { useNavigate, useParams } from 'react-router-dom'
import useFlashMessage from '../../hooks/UseFlashMessage'
import { Tweet } from 'react-twitter-widgets'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

const EditPost = () => {
  const [token] = useState(localStorage.getItem('token') || '')
  const editor = useRef(null);

  const [posts, setPosts] = useState({})
  const [titulo, setTitulo] = useState()
  const [conteudo, setConteudo] = useState();
  const [image, setImage] = useState()
  const [politica, setPolitica] = useState(false)
  const [geek, setGeek] = useState(false)
  const [esportes, setEsportes] = useState(false)
  const [internacional, setInternacional] = useState(false)

  const { id } = useParams()

  const { setFlashMessage } = useFlashMessage()
  const navigate = useNavigate()


  const { registerPost } = useContext(Context)

  const config = useMemo(
    () => ({
      readonly: false,
      height: 500,
      language:'pt_br',
        "iframe": true,
    }),
    []
  );

  useEffect(() => {
    api.get(`/posts/single/${id}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      }
    })
      .then((response) => {
        setPosts(response.data)
        setTitulo(response.data.titulo)
        setConteudo(response.data.conteudo)
        setImage(response.data.image)
      })
  }, [token, id])

  console.log(titulo)

  async function updatePost(post) {
    let msgType = 'success'


    const formData = new FormData()
    const userFormData = await Object.keys(post).forEach((key) =>
      formData.append(key, post[key]),
    )

    formData.append('posts', userFormData)

    const data = await api
      .patch(`posts/update/${posts._id}`, formData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        console.log(response.data)
        return response.data
      })
      .catch((err) => {
        console.log(err)
        msgType = 'error'
        return err.response.data
      })

    setFlashMessage(data.message, msgType)
    navigate('/user/myprofile')
  }


  const handleSubmit = async (e) => {

    e.preventDefault()
    const posts = {
      titulo,
      conteudo,
      geek,
      politica,
      esportes,
      internacional,
      image
    }
    updatePost(posts)
  }


  return (
    <div className="editor">
      <Message />

      {posts && (
        <Form className='form-create' onSubmit={handleSubmit}>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Selecione uma imagem</Form.Label>
            <Form.Control type="file" name="image" onChange={e => setImage(e.target.files[0])} required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Titulo da matéria</Form.Label>
            <Form.Control type="text" name='titulo' value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder="Titulo" required />
          </Form.Group>
          {/* <input type="file" name="image" onChange={e => setImage(e.target.files[0])} required /> */}
          {['radio'].map((type) => (
        <div key={`inline-${type}`} className="mb-3 group-checkbox">
          <Form.Check
            inline
            label="Política"
            name='genero'
            value={true}
            type={type}
            id={`inline-${type}-1`}
            onChange={(e) => setPolitica(e.target.value)}
          />
          <Form.Check
            inline
            label="Geek"
            name='genero'
            value={true}
            type={type}
            id={`inline-${type}-2`}
            onChange={(e) => setGeek(e.target.value)}
          />
           <Form.Check
            inline
            label="Esportes"
            name='esportes'
            value={true}
            type={type}
            id={`inline-${type}-2`}
            onChange={(e) => setEsportes(e.target.value)}
          /> 
          <Form.Check
            inline
            label="Internacional"
            name='internacional'
            value={true}
            type={type}
            id={`inline-${type}-2`}
            onChange={(e) => setInternacional(e.target.value)}
          />        
        </div>
      ))}
          <JoditEditor
            ref={editor}
            value={conteudo}
            config={config}
            tabIndex={1} // tabIndex of textarea
            onBlur={(conteudo) => setConteudo(conteudo)} // preferred to use only this option to update the content for performance reasons
            onChange={(e) => setConteudo(e)}
          />
          <Button variant="danger" type="submit">
            Publicar
          </Button>
        </Form>
      )}

    </div>
  );
}

export default EditPost