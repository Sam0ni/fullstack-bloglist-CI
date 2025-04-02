const cors = require("cors")
const config = require("./utils/config")
const express = require("express")
const middleware = require("./utils/middleware")
const app = express()
const mongoose = require("mongoose")
const blogsRouter = require("./controllers/blogs")
delete require.cache[require.resolve("./controllers/users")]
const usersRouter = require("./controllers/users")
const loginRouter = require("./controllers/login")

app.use(express.static("build"))
app.use(cors())
app.use(express.json())
app.use(middleware.tokenExtractor)
app.use("/api/blogs", middleware.userExtractor, blogsRouter)
app.use("/api/users", usersRouter)
app.use("/api/login", loginRouter)

if (process.env.NODE_ENV === "test") {
    const testingRouter = require("./controllers/testing")
    app.use("/api/testing", testingRouter)
}



console.log("connecting to db")
mongoose.set("strictQuery", false)
mongoose.connect(config.mongoUrl)
    .then(() => {
        console.log("connected!")
    })
    .catch((error) => {
        console.log(`well... uh... seems like this happened: ${error.message}`)
    })

module.exports = app