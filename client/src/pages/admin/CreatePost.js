import React, { useState,useEffect, useRef, useMemo,useContext } from "react";
import JoditEditor from "jodit-react";
import "./style.css";
import api from "../../api/Api";
import Message from '../../components/Message';
import { Context } from "../../context/UserContext";
import Form from 'react-bootstrap/Form';

import { useNavigate,  } from 'react-router-dom'
import useFlashMessage from '../../hooks/UseFlashMessage'


import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

const Editor = () => {
  const [token] = useState(localStorage.getItem('token') || '')
  const editor = useRef(null);

  const [titulo,setTitulo] = useState()
  const [conteudo, setConteudo] = useState();
  const [politica, setPolitica] = useState(false)
  const [geek, setGeek] = useState(false)
  const [esportes, setEsportes] = useState(false)
  const [internacional, setInternacional] = useState(false)
  const [image, setImage] = useState()
  const [user, setUser] = useState({})


  const {registerPost} = useContext(Context)

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
  api
    .get('/users/checkuser', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    })
    .then((response) => {
      setUser(response.data)
    })
}, [token])



const handleSubmit = async (e)=>{
  e.preventDefault()

   const posts = {
    titulo,
    conteudo,
    geek,
    politica,
    esportes,
    internacional,
    image,
   }
   registerPost(posts);
   
}



  return (

    <div className="body-editor">
      <br></br>
      <br></br>
    <div className="editor">
      
        <Form className='form-create' onSubmit={handleSubmit}>
               <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Selecione uma imagem</Form.Label>
        <Form.Control type="file"  name="image" onChange={e => setImage(e.target.files[0])} required />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Titulo da mat??ria</Form.Label>
        <Form.Control type="text" id='input' name='titulo' onChange={(e) => setTitulo(e.target.value)} placeholder="Titulo" required />
      </Form.Group>
      
      {['radio'].map((type) => (
        <div key={`inline-${type}`} className="mb-3 group-checkbox">
          <Form.Check
            inline
            label="Pol??tica"
            name='genero'
            value={true}
            type='radio'
            id={`inline-${type}-1`}
            onChange={(e) => setPolitica(e.target.value)}
          />
          <Form.Check
            inline
            label="Geek"
            name='genero'
            value={true}
            type='radio'
            id={`inline-${type}-2`}
            onChange={(e) => setGeek(e.target.value)}
          />
           <Form.Check
            inline
            label="Esportes"
            name='genero'
            value={true}
            type='radio'
            id={`inline-${type}-3`}
            onChange={(e) => setEsportes(e.target.value)}
          />
          <Form.Check
            inline
            label="Internacional"
            name='genero'
            value={true}
            type='radio'
            id={`inline-${type}-4`}
            onChange={(e) => setInternacional(e.target.value)}
          />                 
        </div>
      ))}
           
          
      
      


            {/* <input type="file" name="image" onChange={e => setImage(e.target.files[0])} required /> */}
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
        
       
    </div>
    </div>
  );
};

export default Editor;