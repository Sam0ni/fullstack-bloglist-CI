import React from "react"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import CreateBlog from "./BlogForm"

test("When submitting blog, creation handler is called with right data", async () => {
    const user = userEvent.setup()
    const mockHandler = jest.fn()

    render(<CreateBlog handleCreation={mockHandler} />)

    const titleInput = screen.getByPlaceholderText("Write title here")
    const authorInput = screen.getByPlaceholderText("Write author here")
    const urlInput = screen.getByPlaceholderText("Write url here")
    const submitButton = screen.getByText("create")

    await user.type(titleInput, "testblog")
    await user.type(authorInput, "tester")
    await user.type(urlInput, "test.test")
    await user.click(submitButton)

    expect(mockHandler.mock.calls).toHaveLength(1)
    expect(mockHandler.mock.calls[0][0].title).toBe("testblog")
    expect(mockHandler.mock.calls[0][0].author).toBe("tester")
    expect(mockHandler.mock.calls[0][0].url).toBe("test.test")
})