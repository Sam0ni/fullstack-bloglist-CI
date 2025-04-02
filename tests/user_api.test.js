const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require ("../app")
const api = supertest(app)
const User = require("../models/user")

describe("User Creation", () => {
    beforeEach(async () => {
        await User.deleteMany({})
    })
    test("User with nonexistent username will not be created", async () => {
        const user = {
            name: "not telling",
            password: "do i need one?"
        }

        await api
            .post("/api/users")
            .send(user)
            .expect(400)

        const result = await api.get("/api/users")
        expect(result.body).toHaveLength(0)
    })

    test("User with nonexistent password will not be created", async () => {
        const user = {
            username: "do not need one, right?",
            name: "not telling"
        }

        await api
            .post("/api/users")
            .send(user)
            .expect(400)

        const result = await api.get("/api/users")
        expect(result.body).toHaveLength(0)
    })

    test("User with too short username will not be created", async () => {
        const user = {
            username: "a",
            name: "not telling",
            password: "longone"
        }

        await api
            .post("/api/users")
            .send(user)
            .expect(400)

        const result = await api.get("/api/users")
        expect(result.body).toHaveLength(0)
    })

    test("User with too short password will not be created", async () => {
        const user = {
            username: "do not need one, right?",
            name: "not telling",
            password: "e3"
        }

        await api
            .post("/api/users")
            .send(user)
            .expect(400)

        const result = await api.get("/api/users")
        expect(result.body).toHaveLength(0)
    })

    test ("User will not be created if the username is already taken", async () => {
        const user = {
            username: "do not need one, right?",
            name: "not telling",
            password: "e3333"
        }
        await api
            .post("/api/users")
            .send(user)

        await api
            .post("/api/users")
            .send(user)
            .expect(400)

        const result = await api.get("/api/users")
        expect(result.body).toHaveLength(1)
    })
})

afterAll(async () => {
    await mongoose.connection.close()
})