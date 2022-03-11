const express = require('express')
const res = require('express/lib/response')
const router = express.Router()

//load model
const Post =require('../models/Post')
//hien thi tat ca bai viet
router.get('/', async(req,res) =>{
    const posts = await Post.find().lean().sort({date: -1})
    res.render('posts/index', {posts})
})

//hien thi form de tao bai viet moi
router.get('/add', (req, res) =>{
    res.render('posts/add')
})
//tao post moi
router.post('/',async(req, res) =>{
    const {title, text} = req.body

    let errors = []
    if (!title) errors.push({msg: 'Title required'})
    if (!text) errors.push({msg: 'Text required'})
    if (errors.length > 0) res.render('posts/add', { title, text})
    else{
        const newPostData = { title, text}
        const newPost = new Post(newPostData)
        await newPost.save()
        res.redirect('/posts')
    }
})

//dua ra hien thi form de nguoi dung thay doi bai viet
router.get('/edit/:id', async(req, res) =>{
    const post = await Post.findOne({_id: req.params.id}).lean()
    res.render('posts/edit', {post})
})
//cap nhat thy doi bai viet vao csdl
router.put('/:id', async(req,res)=>{
    const {title, text} = req.body
    await Post.findOneAndUpdate({ _id: req.params.id}, {title, text})
    res.redirect('/posts')
})
//xoa bai viet
router.delete('/:id', async(req,res) =>{
    await Post.findOneAndRemove({ _id: req.params.id })
    res.redirect('/posts')
})

module.exports = router