const Users = require('../models/Users')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const ObjectId = require('mongoose').Types.ObjectId
const Posts = require('../models/Posts')


const createUserToken = require('../helpers/create-user-token')
const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')

module.exports = class UserController{
    static async register(req,res){
        const {name,email,password,confirmpassword} = req.body

        if(!name){
            res.status(422).json({message:'O Nome é obrigatório'})
            return
        }

        if(!email){
            res.status(422).json({message:'O Email é obrigatório'})
            return
        }


        if(!password){
            res.status(422).json({message:'A Senha é obrigatória!'})
            return
        }

        if(!confirmpassword){
            res.status(422).json({message:'A confirmação de senha é obrigatória!'})
            return
        }

        if(password !== confirmpassword){
            res.status(422)
            .json({
                message:'A Senha e a confirmação de senha precisam ser iguais'
            })
            return
        }

        const userExists = await Users.findOne({email:email})
        
        if(userExists){
            res.status(422)
            .json({
                message: 'O email cadastrado já existe!'
            })
            return
        }

        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password,salt)

        const user = new Users({
            _id: ObjectId(),
            name,
            email,
            password: passwordHash,
            admin: "2",
            eAdmin: false
        })

        try{
            const newUser = await user.save()
           
            await createUserToken(newUser, req,res)
        }catch(error){
            res.status(500).json({message:error})
        }

    }

    static async login(req,res){
        const {email,password} = req.body

        if(!email){
            res.status(422).json({message:'O Email é obrigatório!'})
            return
        }

        if(!password){
            res.status(422).json({message:'A Senha é obrigatória!'})
            return
        }

        const user = await Users.findOne({email:email})
        
        if(!user){
            res.status(422)
            .json({
                message: 'Usuário Não Existe!'
            })
            return
        }

        const checkPassword = await bcrypt.compare(password, user.password)

        if(!checkPassword){
            res.status(422).json({
                message:'Senha Incorreta!'
            })
            return
        }
        await createUserToken(user,req,res)
    }

    static async checkUser(req,res){

        let currentUser


        if(req.headers.authorization){

            const token = getToken(req)
            const decoded = jwt.verify(token, 'qwertyuiopasdfghjklzxcvbnm123456adfdiutgeduytfrdyduishflsfiu8ydeisuo')

            currentUser = await Users.findById(decoded.id)

            currentUser.password = undefined
        }else{
            currentUser = null
        }

        res.status(200).send(currentUser)
    }

    static async getUserById(req,res){
        const id = req.params.id
        if (!id.match(/^[0-9a-fA-F]{24}$/)){
            res.status(422).json({"message":" User not found!"})
            return
        }



        const user = await Users.findById(id).select("-password")

        const posts = await Posts.find({'user._id':user._id}).exec()
        const postsRecent = await Posts.find({'user._id':user._id}).sort('-createdAt').exec()

        

        res.status(200).json({user,posts,postsRecent})

    }

    

    static async editUser(req,res){
        const id = req.params.id

        if (!id.match(/^[0-9a-fA-F]{24}$/)){
            res.status(422).json({"message":" User not found!"})
            return
        }

        const token = getToken(req)
        const user = await getUserByToken(token)

        const {name, email, password, confirmpassword} = req.body


        if(req.file){
            user.image = req.file.filename
        }

        if(!name){
            res.status(422).json({message:'O Nome é obrigatório'})
            return
        }

        user.name = name

        if(!email){
            res.status(422).json({message:'O Email é obrigatório'})
            return
        }
        if(!password){
            res.status(422).json({message:'A senha é obrigatório'})
            return
        }

        const userExists = await Users.findOne({email: email})

        if(!user.email !== email && userExists){
            res.status(422).json({
                message: 'Ultilize Outro Email!'
            })
            return
        }

        user.email = email

        if(password !== confirmpassword){
            res.status(422).json({
                message: 'As senhas não conferem'
            })
            return
        }else if(password === confirmpassword && password != null){
            const salt = await bcrypt.genSalt(12)
            const passwordHash = await bcrypt.hash(password,salt)

            user.password = passwordHash
        }

        try{

            await Users.findOneAndUpdate(
                {_id: user.id},
                {$set: user},
                {new: true}
            )

            res.status(200).json({
                message: 'Atualizado Com Sucesso!'
            })
        }catch(error){
            res.status(500).json({message: err})
            return
        }
    }

    // Edit Name
    static async editUserPassword(req,res){
        const id = req.params.id

        if (!id.match(/^[0-9a-fA-F]{24}$/)){
            res.status(422).json({"message":" User not found!"})
            return
        }

        const token = getToken(req)
        const user = await getUserByToken(token)

        const {password,confirmpassword} = req.body

        if(!password){
            res.status(422).json({message:'A senha é obrigatório'})
            return
        }
        
        if(password !== confirmpassword){
            res.status(422).json({
                message: 'As senhas não conferem'
            })
            return
        }else if(password === confirmpassword && password != null){
            const salt = await bcrypt.genSalt(12)
            const passwordHash = await bcrypt.hash(password,salt)

            user.password = passwordHash
        }

        try{

            await Users.findOneAndUpdate(
                {_id: user.id},
                {$set: user},
                {new: true}
            )

            res.status(200).json({
                message: 'Atualizado Com Sucesso!'
            })
        }catch(error){
            res.status(500).json({message: err})
            return
        }
    }

    // Edit Name
    static async editUserName(req,res){
        const id = req.params.id

        if (!id.match(/^[0-9a-fA-F]{24}$/)){
            res.status(422).json({"message":" User not found!"})
            return
        }

        const token = getToken(req)
        const user = await getUserByToken(token)

        const {name} = req.body

        if(!name){
            res.status(422).json({message:'O Nome é obrigatório'})
            return
        }

        user.name = name

        try{

            await Users.findOneAndUpdate(
                {_id: user.id},
                {$set: user},
                {new: true}
            )
                

            res.status(200).json({
                message: 'Atualizado Com Sucesso!'
            })
        }catch(error){
            res.status(500).json({message: error})
            return
        }
    }


    static async editUserEmail(req,res){
        const id = req.params.id

        if (!id.match(/^[0-9a-fA-F]{24}$/)){
            res.status(422).json({"message":" User not found!"})
            return
        }

        const token = getToken(req)
        const user = await getUserByToken(token)

        const {email} = req.body

        if(!email){
            res.status(422).json({message:'O Email é obrigatório'})
            return
        }

        const userExists = await Users.findOne({email: email})

        if(!user.email !== email && userExists){
            res.status(422).json({
                message: 'Ultilize Outro Email!'
            })
            return
        }

        user.email = email

        try{

            await Users.findOneAndUpdate(
                {_id: user.id},
                {$set: user},
                {new: true}
            )

            res.status(200).json({
                message: 'Atualizado Com Sucesso!'
            })
        }catch(error){
            res.status(500).json({message: err})
            return
        }
    }

    static async editUserImage(req,res){
        const id = req.params.id

        if (!id.match(/^[0-9a-fA-F]{24}$/)){
            res.status(422).json({"message":" User not found!"})
            return
        }

        const token = getToken(req)
        const user = await getUserByToken(token)

        if(req.file){
            user.image = req.file.filename
        }

        try{

            await Users.findOneAndUpdate(
                {_id: user.id},
                {$set: user},
                {new: true}
            )

            res.status(200).json({
                message: 'Atualizado Com Sucesso!'
            })
        }catch(error){
            res.status(500).json({message: err})
            return
        }
    }



    // Admin User Controller

    static async getAllUser(req,res){
        const users = await Users.find().sort('-createdAt')
        res.status(200).json(users)
    }

    static async editUserAdmin(req,res){
        const id = req.params.id

        if (!id.match(/^[0-9a-fA-F]{24}$/)){
            res.status(422).json({"message":" User not found!"})
            return
        }

        const token = getToken(req)
        const user = await getUserByToken(token)

        const {admin} = req.body
        const updateData = {}

        if(!admin){
            res.status(422).json({message: 'O valor admin é obrigatório'})
        }else{
            updateData.admin = admin
        }

        if(user.eAdmin == true){
            try{
              const user = await Users.findOneAndUpdate(
                    {_id:id},
                     {$set:updateData})
                res.status(200).json({message:'User atualizado'})
            }catch(error){
                res.status(500).json({message: error})
                return
            }        
        }else{
            res.json({message:'Acesso Não Autorizado'})
        }

    }

}