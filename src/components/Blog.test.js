import React from "react"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Blog from "./Blog"

test("renders blog but not info initially", async () => {
    const blog = {
        title: "testblog",
        author: "tester",
        url: "test.test"
    }

    const mockHandler = jest.fn()

    render(<Blog blog={blog} handleDeletion={mockHandler} username="testr" updateBlog={mockHandler}/>)

    const element = await screen.findByText("testblog tester")
    expect(element).toBeDefined()

    const element2 = screen.queryByText("test.test")
    expect(element2).toBeNull()
})

test("renders all info after pressing button", async () => {
    const blog = {
        title: "testblog",
        author: "tester",
        url: "test.test",
        likes: 3000,
        user: {
            username: "mr.test"
        }
    }

    const mockHandler = jest.fn()

    render(<Blog blog={blog} handleDeletion={mockHandler} username="testr" updateBlog={mockHandler}/>)

    const user = userEvent.setup()
    const button = screen.getByText("Info")
    await user.click(button)

    const element = await screen.findByText("testblog tester")
    expect(element).toBeDefined()

    const element2 = screen.getByText("test.test")
    expect(element2).toBeDefined()

    const element3 = screen.getByText("3000")
    expect(element3).toBeDefined()
})

test("Like handler is called twice when pressing like button twice", async () => {
    const blog = {
        title: "testblog",
        author: "tester",
        url: "test.test",
        likes: 3000,
        user: {
            username: "mr.test"
        }
    }

    const mockHandler = jest.fn()
    const mockHandlerLikes = jest.fn()

    render(<Blog blog={blog} handleDeletion={mockHandler} username="testr" updateBlog={mockHandlerLikes}/>)

    const user = userEvent.setup()
    const button = screen.getByText("Info")
    await user.click(button)

    const likeButton = screen.getByText("Like")
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandlerLikes.mock.calls).toHaveLength(2)
})
