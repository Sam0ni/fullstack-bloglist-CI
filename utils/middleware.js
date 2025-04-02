const User = require("../models/user")
const jwt = require("jsonwebtoken")

const tokenExtractor = (request, response, next) => {
    const authorization = request.get("authorization")
    if (authorization && authorization.startsWith("Bearer ")) {
        request.token = authorization.replace("Bearer ", "")
    }
    next()
}

const userExtractor = async (request, response, next) => {
    if (request.token) {
        const token = jwt.verify(request.token, process.env.SECRET)
        const user = await User.findById(token.id)
        request.user = user
    }
    next()
}

module.exports = { tokenExtractor, userExtractor }
