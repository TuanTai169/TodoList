const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/auth')

const Post = require('../models/Post')

// @route GET api/post
// @desc Read post
// @access private
router.get('/', verifyToken, async(req, res)=>{
    try {
        const posts = await Post.find({user: req.userId}).populate('user',['username'])
        res.json({
            success: true,
            posts 
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Internal sever error'
        })
    }
})

// @route POST api/post
// @desc Create post
// @access private
router.post('/', verifyToken, async(req, res)=>{
    const {title, description, url, status} = req.body

    //Simple validation
    if(!title)
    return res.status(400).json({
        success: false,
        message: 'Title is required'
    })
    try {
        const newPost = new Post({
            title,
            description,
            url: url.startsWith('https://') ? url : `https://${url}`,
            status: status || 'TO LEARN',
            user: req.userId
        })

        await newPost.save()
        res.json({
            success: true,
            message: 'Happy learning !',
            post: newPost
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Internal sever error'
        })
    }
})

// @route PUT api/post
// @desc Update post
// @access private
router.put('/:id', verifyToken, async(req, res)=>{
    const {title, description, url, status} = req.body

    //Simple validation
    if(!title)
    return res.status(400).json({
        success: false,
        message: 'Title is required'
    })
    try {
        let updatedPost = {
            title,
            description: description || '',
            url: (url.startsWith('https://') ? url : `https://${url}`) || '',
            status: status || 'TO LEARN',
        }

        //Thỏa 2 điều kiện: _id của post và người dùng sở hữu post
        const postUpdateCondition = {_id: req.params.id, user: req.userId}

        updatedPost = await Post.findOneAndUpdate(postUpdateCondition, updatedPost, {new: true})  //new: true trả về update mới
        
        //User not authorized to updated post
        if(!updatedPost)
        return res.status(401).json({
            success: false,
            message: 'Post not found or user not authorized'
        })

        res.json({
            success: true,
            message: 'Excellent process',
            post: updatedPost
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Internal sever error'
        })
    }
})

// @route DELETE api/post
// @desc Delete post
// @access private
router.delete('/:id', verifyToken, async(req, res) => {
    try {
        const postDeleteCondition = {_id: req.params.id, user: req.userId}
        const deletePost = await Post.findOneAndDelete(postDeleteCondition)

        //User not authorized or post not found
        if(!deletePost)
        return res.status(401).json({
            success: false,
            message: 'Post not found or user not authorized'
        })

        res.json({
            success: true,
            post: deletePost
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Internal sever error'
        })
    }
})
module.exports = router