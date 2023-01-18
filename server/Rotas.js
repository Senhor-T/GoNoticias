const express = require('express')
const ObjectId = require('mongoose').Types.ObjectId
const router = express.Router()
const moment = require('moment')

const Posts = require('./models/Posts')
const Users = require('./models/Users')


const mes = moment().startOf('month')
const ano = moment().startOf('year')


router.get('/posts',async(req,res)=>{
    const { q } = req.query;
    const posts = await Posts.find({ titulo: new RegExp(q, "i") }).exec()

    res.json(posts)
})

router.get('/posts-recentes',async(req,res)=>{
    const posts = await Posts.find({}).sort({createdAt: -1}).exec()
    return res.status(200).json(posts)
})

router.get('/posts-mais-vistos/year',async(req,res)=>{
    const posts = await Posts.find({createdAt:{
        $gte: ano.toDate(),
    $lte: moment(ano).endOf('year').toDate()
    }}).sort({"views":-1}).limit(4).exec()
    return res.status(200).json(posts)
})


router.get('/posts-mais-vistos/month',async(req,res)=>{
    const posts = await Posts.find({createdAt:{
        $gte: mes.toDate(),
    $lte: moment(mes).endOf('month').toDate()
    }}).sort({"views":-1}).limit(4).exec()
    return res.status(200).json(posts)
})


router.get('/:slug',async(req,res)=>{
    const posts = await Posts.findOneAndUpdate({slug:req.params.slug},{$inc:{views: 1}},{new:true}).exec()
    return res.status(200).json(posts)
})





module.exports = router

