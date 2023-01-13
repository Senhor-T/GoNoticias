const jwt =  require('jsonwebtoken')
const { use } = require('../routes/UserRoutes')


const createUserToken = async(user,req,res) => {

    const token = jwt.sign({
        name: user.name,
        id: user._id,
        admin: user.admin

    },"qwertyuiopasdfghjklzxcvbnm123456adfdiutgeduytfrdyduishflsfiu8ydeisuo")

    res.status(200).json({
        message: 'Você está autenticado',
        token: token,
        userId: user._id,
        admin: user.admin
    })
}

module.exports = createUserToken