const express = require('express')
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



app.use('/',router)


const PostRoutes = require('./routes/PostRoutes')
const UserRoutes = require('./routes/UserRoutes')


app.use('/posts', PostRoutes)
app.use('/users', UserRoutes)

app.listen(port, ()=>{
    console.log(`Rodando na porta ${port}`)
})
