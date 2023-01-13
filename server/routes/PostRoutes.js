const router = require('express').Router()
const PostController = require('../controllers/PostController')
const verifyToken = require('../helpers/verify-token')
const { imageUpload} = require('../helpers/image-upload')
const imagePostUpload = require('../helpers/imageUpload')

const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')
const { route } = require('./UserRoutes')


router.post('/create',
    verifyToken,
    imageUpload.single('image'),
PostController.create
)

router.get('/',PostController.getAll)
router.get('/single/:id',PostController.getPostsById)
router.get('/myposts',PostController.getPostsUser)
router.get('/myrecentsposts',PostController.getRecentPostsUser)
router.delete('/delete/:id',verifyToken,PostController.removePost)

router.patch('/update/:id',
verifyToken,
imageUpload.single('image'),
PostController.updatePost
)

//Rotas de generos

router.get('/genre/geek',PostController.genreGeekPost)
router.get('/genre/politica',PostController.genrePolicticPost)
router.get('/genre/esportes',PostController.genreFutebolPost)
router.get('/genre/internacional',PostController.genreInternacionalPost)

//Admin Route

router.delete('/admin/delete/:id',verifyToken,PostController.removePostAdmin)



module.exports = router