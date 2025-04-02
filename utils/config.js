require("dotenv").config()

let PORT = process.env.PORT
let password = process.env.MONGO_PASS
let mongoUrl = process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI
mongoUrl = `mongodb+srv://mrstack:${password}@cluster0.qen7pxe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
module.exports = {
    mongoUrl,
    PORT
}