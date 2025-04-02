const bcrypt = require("bcryptjs")
const usersRouter = require("express").Router()
const User = require("../models/user")


usersRouter.post("/", async (request, response) => {
    const { username, name, password } = request.body
    console.log("this is a test log")

    if (username === undefined || password === undefined
        || username.length < 3 || password.length < 3) {
        return response.status(400).json({ error: "Invalid username or password" })
    }
    const exists = await User.exists({ username: username })
    if (exists) {
        return response.status(400).json({ error: "Username has already been taken" })
    }


    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const newUser = new User({
        username,
        name,
        passwordHash
    })

    const savedUser = await newUser.save()

    response.status(201).json(savedUser)
})

usersRouter.get("/", async (request, response) => {
    const allUsers = await User.find({}).populate("blogs", { title: 1, author: 1, url: 1 })
    response.json(allUsers)
})

module.exports = usersRouter