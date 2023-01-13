const express = require('express')
const passport = require('passport');
const session = require('express-session');
const fileupload = require('express-fileupload')
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')
const Posts = require('./models/Posts')
const ObjectId = require('mongoose').Types.ObjectId
const router = require('./Rotas')
const slugify = require('slugify')
const bcrypt = require('bcryptjs')
const Users = require('./models/Users')



const app = express()

const port = 8080

app.use(express.json())
app.use(cors({credentials: true, origin: 'http://localhost:3000'}))
app.use(express.static('public'))


mongoose.connect('mongodb://localhost:27017/GoClick').then(()=>{
    console.log('Conectado ao Banco de Dados')
}).catch((err)=>{
    console.log(err.message)
})

require('./config/auth')(passport)
app.use(session({
    secret:'dfhfgsfgilsadçpjadjadpjdfndso',
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 8400000}
}))
app.use(passport.initialize())
app.use(passport.session())

app.use('/',router)



app.post('/create-post',(req,res)=>{
    let newSlug = req.body.titulo
    const slug = slugify(newSlug,{
        replacement: '-',  
        remove: undefined, 
        lower: true,      
        strict: true,     
        locale: 'vi',       
        trim: true  
    })


    Posts.create({
        _id: ObjectId(),
        titulo: req.body.titulo,
        conteudo: req.body.conteudo,
        imagem: req.body.imagem,
        // genero: req.body.genero,
        slug:slug,
        views: 0
      
    })
    res.send('Criado com Sucesso')
})

app.post('/create-user',async(req,res)=>{
        Users.findOne({'name':req.body.name})
        .then(user =>{
            if(user){
               res.json({success: false, message:
            'Esse nome de usuário já existe'
        })
            }else{
                bcrypt.hash(req.body.password,10)
                .then(hash =>{
                    let hashedPassword = hash
                    const newUser =  Users.create({
                        _id: ObjectId(),
                        name: req.body.name,
                        email: req.body.email,
                        password: hashedPassword
                    })
            
                    .then(() => res.json({ success: true, message: 'User created with success', statusCode: 201 }))
                  .catch(err => res.json({ success: false, message: err, statusCode: 500 }));
                }) 
            }
        })    
})


const PostRoutes = require('./routes/PostRoutes')
const UserRoutes = require('./routes/UserRoutes')


app.use('/posts', PostRoutes)
app.use('/users', UserRoutes)

app.listen(port, ()=>{
    console.log(`Rodando na porta ${port}`)
})