const UserController = require('../controllers/UserControllers')

const router = require('express').Router()

const verifyToken = require('../helpers/verify-token')
const { imageUpload } = require('../helpers/image-upload')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/checkuser', UserController.checkUser)
router.get('/:id', UserController.getUserById)
router.patch(
    '/edit/:id', verifyToken,
    imageUpload.single("image"),
    UserController.editUser)

router.patch(
    '/edit/image/:id', verifyToken,
    imageUpload.single("image"),
    UserController.editUserImage)

router.patch(
    '/edit/email/:id', verifyToken,
    UserController.editUserEmail)

router.patch(
    '/edit/name/:id', verifyToken,
    UserController.editUserName)

router.patch(
    '/edit/password/:id', verifyToken,
    UserController.editUserPassword)

// Admin Route
router.get('/get/user', UserController.getAllUser)
router.patch('/edit/admin/:id',
    verifyToken, UserController.editUserAdmin)


module.exports = router