describe("Blog app", function() {
    beforeEach(function() {
        cy.request("POST", "http://localhost:3003/api/testing/reset")
        const user = {
            username: "testaaja",
            name: "mr.test",
            password: "testauson5nosanotaan1kautta5"
        }
        cy.request("POST", "http://localhost:3003/api/users", user)
        cy.visit("http://localhost:3000")
    })

    it("Login form is shown", function() {
        cy.contains("Login")
        cy.contains("username")
        cy.contains("password")
        cy.contains("login")
    })

    describe("Login",function() {
        it("succeeds with correct credentials", function() {
            cy.get("#username").type("testaaja")
            cy.get("#password").type("testauson5nosanotaan1kautta5")
            cy.get("#loginButton").click()

            cy.contains("Logged in as testaaja")
        })

        it("fails with wrong credentials", function() {
            cy.get("#username").type("testaaja")
            cy.get("#password").type("testauson1nosanotaan5kautta5")
            cy.get("#loginButton").click()

            cy.get(".notif").contains("invalid username or password")
        })
    })

    describe("When logged in", function() {
        beforeEach(function() {
            cy.login({ username: "testaaja", password: "testauson5nosanotaan1kautta5" })
        })

        it("A blog can be created", function() {
            cy.contains("New Blog").click()

            cy.get("#title").type("testausblogi")
            cy.get("#author").type("testaaja")
            cy.get("#url").type("testi.testi")

            cy.get("#createButton").click()

            cy.contains("testausblogi testaaja")
        })

        describe("When blog has been created", function() {
            beforeEach(function() {
                cy.createNewBlog({ title: "testaus?", author: "mr.test", url: "test.test", likes: 0 })
            })

            it("A blog can be liked", function() {
                cy.contains("testaus? mr.test")
                    .get("#info").click()

                cy.contains("testaus? mr.test")
                    .get("#like").click()

                cy.contains("testaus? mr.test")
                    .get("#likes").contains(1)

                cy.visit("http://localhost:3000")

                cy.contains("testaus? mr.test")
                    .get("#info").click()
                cy.contains("testaus? mr.test")
                    .get("#likes").contains(1)
            })

            it("A blog can be deleted by the user who added it", function() {
                cy.contains("testaus? mr.test")
                    .get("#info").click()
                cy.contains("testaus? mr.test")
                    .get("#deleteButton").click()

                cy.get("html").should("not.contain", "testaus? mr.test")

                cy.visit("http://localhost:3000")

                cy.get("html").should("not.contain", "testaus? mr.test")
            })

            it("Delete button can only be seen by the user who added the blog", function() {
                const user = {
                    username: "testaaja2",
                    name: "mr.test2",
                    password: "testauson5nosanotaan2kautta5"
                }
                cy.request("POST", "http://localhost:3003/api/users", user)
                cy.contains("Logout").click()
                cy.login( { username: "testaaja2", password: "testauson5nosanotaan2kautta5" })

                cy.contains("testaus? mr.test")
                    .get("#info").click()
                cy.get("html")
                    .should("not.contain", "Delete")
            })
        })

        describe("When multiple blogs have been created", function() {
            beforeEach(function() {
                cy.createNewBlog({ title: "testaus?", author: "mr.test", url: "test.test", likes: 3001 })
                cy.createNewBlog({ title: "testaus2", author: "mr.test", url: "test.test", likes: 3002 })
            })

            it("blogs are sorted by likes", function() {
                cy.get(".blog").eq(0).should("contain", "testaus2")
                cy.get(".blog").eq(1).should("contain", "testaus?")

                cy.contains("testaus? mr.test")
                    .contains("Info").click()

                cy.contains("testaus? mr.test").parent().contains("Like").as("likeButton")
                cy.get("@likeButton").click()
                cy.get("@likeButton").click()

                cy.visit("http://localhost:3000")

                cy.get(".blog").eq(1).should("contain", "testaus2")
                cy.get(".blog").eq(0).should("contain", "testaus?")
            })
        })
    })
})