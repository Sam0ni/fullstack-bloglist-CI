const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const jwt = require("jsonwebtoken")

blogsRouter.get("/", async (request, response) => {
    const allBlogs = await Blog.find({}).populate("user", {
        username: 1,
        name: 1,
    }).exec()
    response.json(allBlogs)
})

blogsRouter.post("/", async (request, response) => {
    if (!request.token) {
        return response.status(401).json({ error: "no token is provided" })
    }
    const token = jwt.verify(request.token, process.env.SECRET)
    if (!token.id) {
        return response.status(401).json({ error: "invalid token" })
    }

    const blog = new Blog({
        title: request.body.title,
        author: request.body.author,
        url: request.body.url,
        likes: request.body.likes || 0,
        user: request.user._id,
    })
    try {
        const result = await blog.save()
        request.user.blogs = request.user.blogs.concat(result._id)
        await request.user.save()
        response.status(201).json(result)
    } catch (exception) {
        response.status(400).json({ error: exception.message })
    }
})

blogsRouter.delete("/:id", async (request, response) => {
    try {
        const token = jwt.verify(request.token, process.env.SECRET)
        if (!token.id) {
            return response.status(401).json({ error: "invalid token" })
        }
        const blog = await Blog.findById(request.params.id)
        if (!blog) {
            return response.status(204).end()
        } else if (blog.user.toString() === request.user._id.toString()) {
            await blog.deleteOne()
            response.status(204).end()
        } else {
            response
                .status(401)
                .json({ error: "A blog can be removed only by the creator" })
        }
    } catch (exception) {
        if (exception.name === "CastError") {
            response.status(400).json({ error: exception.message })
        }
    }
})

blogsRouter.put("/:id", async (request, response) => {
    const blog = request.body
    try {
        const updated = await Blog.findByIdAndUpdate(request.params.id, blog, {
            new: true,
        })
        response.json(updated)
    } catch (exception) {
        if (exception.name === "CastError") {
            response.status(400).json({ error: exception.message })
        }
    }
})

module.exports = blogsRouter
