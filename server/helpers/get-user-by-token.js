const jwt = require('jsonwebtoken')

const Users = require('../models/Users')


const getUserByToken = async (token) =>{

    if(!token){
        return res.status(401).
        json({message:'Acesso negado'})
    }


    const decoded = jwt.verify(token,'qwertyuiopasdfghjklzxcvbnm123456adfdiutgeduytfrdyduishflsfiu8ydeisuo')

    const userId = decoded.id
    const admin = decoded.admin

    const user = await Users.findOne({_id: userId})

    

    return user
}

module.exports = getUserByToken