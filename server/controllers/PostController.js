const Posts = require('../models/Posts')
const shortid = require('shortid');
const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')
const ObjectId = require('mongoose').Types.ObjectId
const slugify = require('slugify')

module.exports = class PostController {
    static async create(req, res) {
        const { titulo, conteudo, genero } = req.body
        let image = ''

        if (req.file) {
            image = req.file.filename
        }

        if (!titulo) {
            res.status(422).json({
                message: 'O titulo é obrigatório!'
            })
            return
        }

        

        if (!conteudo) {
            res.status(422).json({
                message: 'O conteudo é obrigatório!'
            })
            return
        }

        const userExists = await Posts.findOne({ titulo: titulo })

        if (userExists) {
            res.status(422)
                .json({
                    message: 'Esse titulo já existe, por favor, use outro.'
                })
            return
        }




        const token = getToken(req)
        const user = await getUserByToken(token)



        let newSlug = req.body.titulo
        const slug = slugify(newSlug, {
            replacement: '-',
            remove: undefined,
            lower: true,
            strict: true,
            locale: 'vi',
            trim: true
        })



        const post = new Posts({
            _id: ObjectId(),
            shortid: shortid.generate(),
            titulo,
            conteudo,
            image,
            slug: slug,
            genero: {
                geek: req.body.geek,
                politica: req.body.politica,
                esportes: req.body.esportes,
                internacional: req.body.internacional
            },
            views: 0,
            user: {
                _id: user._id,
                name: user.name,
                image: user.image,
            },
        })

        if (user.admin == "1") {
            try {
                const newPost = await post.save()

                res.status(201).json({
                    message: 'Post cadastrado com sucesso!',
                    newPost: newPost
                })

            } catch (error) {
                res.status(500).json({ message: error })
            }
        } else {
            res.status(422).json({ message: 'Você Não tem autoriação para criar uma matéria' })
        }


    }

    static async getAll(req, res) {
        const posts = await Posts.find().sort('-createdAt')

        res.status(200).json(posts)
    }

    static async getPostsById(req, res) {
        const id = req.params.id

        if (!ObjectId.isValid(id)) {
            res.status(422).json({ message: 'ID inválido' })
            return
        }

        const posts = await Posts.findOne({ _id: id })

        if (!posts) {
            res.status(404).json({ message: 'Matéria não encontrado!' })
            return
        }

        res.status(200).json(posts)
    }


    static async getPostsUser(req, res) {
        const token = getToken(req)
        const user = await getUserByToken(token)

        const posts = await Posts.find({ 'user._id': user._id }).exec()

        res.status(200).json(posts)
    }



    static async getRecentPostsUser(req, res) {

        const token = getToken(req)
        const user = await getUserByToken(token)


        const posts = await Posts.find({ 'user._id': user._id }).sort({ createdAt: -1 }).exec()
        res.status(200).json(posts)
    }

    static async removePost(req, res) {
        const id = req.params.id

        if (!ObjectId.isValid(id)) {
            res.status(422).json({ message: 'ID Inválido!' })
            return
        }

        const posts = await Posts.findOne({ _id: id })

        if (!posts) {
            res.status(404).json({ message: 'Matéria não encontrada!' })
            return
        }

        const token = getToken(req)
        const user = await getUserByToken(token)

        if (posts.user._id.toString() != user._id.toString()) {
            res.status(404).json({
                message:
                    'Houve um problema desconhecido, tente novamente'
            })
            return
        }

        await Posts.findByIdAndRemove(id)

        res.status(200).json({ message: 'Matéria removida com sucesso!' })

    }

    static async updatePost(req, res) {
        const id = req.params.id
        const { titulo, conteudo,esportes} = req.body
        let image = ''
        const updateData = {}

        const posts = await Posts.findOne({ _id: id })

        let newSlug = req.body.titulo
        const slug = slugify(newSlug, {
            replacement: '-',
            remove: undefined,
            lower: true,
            strict: true,
            locale: 'vi',
            trim: true
        })

        if (!posts) {
            res.status(404).json({ message: 'Matéria não encontrada!' })
            return
        }

        const token = getToken(req)
        const user = await getUserByToken(token)

        if (posts.user._id.toString() != user._id.toString()) {
            res.status(404).json({
                message:
                    'Houve um problema desconhecido, tente novamente'
            })
            return
        }

        if (!titulo) {
            res.status(422).json({ message: 'O titulo é obrigatório!' })
            return
        } else {
            updateData.titulo = titulo
        }

        updateData.slug = slug

        if (!conteudo) {
            res.status(422).json({ message: 'O conteúdo é obrigatório!' })
            return
        } else {
            updateData.conteudo = conteudo
        }

        if (req.file) {
            image = req.file.filename
        }

        

        await Posts.findByIdAndUpdate(id, updateData)
        await Posts.findOneAndUpdate({_id: id},{$set: {
            'genero.geek': req.body.geek,
            'genero.politica': req.body.politica,
            'genero.esportes': req.body.esportes,
            'genero.internacional': req.body.internacional,
            
        }})

        res.status(200).json({ posts: posts, message: 'Matéria atualizada' })
    }

    static async genreGeekPost(req, res) {
        const posts = await Posts.find({ 'genero.geek': 'true' }).sort({ createdAt: -1 }).exec()
        res.status(200).json(posts)
    }

    static async genrePolicticPost(req, res) {
        const posts = await Posts.find({ 'genero.politica': 'true' }).sort({ createdAt: -1 }).exec()
        res.status(200).json(posts)
    }
    static async genreFutebolPost(req, res) {
        const posts = await Posts.find({ 'genero.esportes': 'true' }).sort({ createdAt: -1 }).exec()
        res.status(200).json(posts)
    }
    static async genreInternacionalPost(req, res) {
        const posts = await Posts.find({ 'genero.internacional': 'true' }).sort({ createdAt: -1 }).exec()
        res.status(200).json(posts)
    }


    static async removePostAdmin(req, res) {
        const id = req.params.id

        if (!ObjectId.isValid(id)) {
            res.status(422).json({ message: 'ID Inválido!' })
            return
        }

        const posts = await Posts.findOne({ _id: id })

        if (!posts) {
            res.status(404).json({ message: 'Matéria não encontrada!' })
            return
        }

        const token = getToken(req)
        const user = await getUserByToken(token)


        if(user.eAdmin == true){
           await Posts.findByIdAndRemove(id)
        }else{
            res.status(404).json({
                message:
                    'Houve um problema desconhecido, tente novamente'
            })
        }

        res.status(200).json({ message: 'Matéria removida com sucesso!' })

    }

    

}