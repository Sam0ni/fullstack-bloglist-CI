import axios from "axios"
const baseUrl = "/api/blogs"

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const createBlog = async (token, blog) => {
    const auth = `Bearer ${token}`
    const config = {
        headers: { Authorization: auth }
    }
    const response = await axios.post(baseUrl, blog, config)
    return response.data
}

const updateBlog = async (token, id, blog) => {
    const auth = `Bearer ${token}`
    const config = {
        headers: { Authorization: auth }
    }
    const response = await axios.put(`${baseUrl}/${id}`, blog, config)
    return response.data
}

const deleteBlog = async (token, id) => {
    const auth = `Bearer ${token}`
    const config = {
        headers: { Authorization: auth }
    }
    const response = await axios.delete(`${baseUrl}/${id}`, config)
    return response.data
}


export default { getAll, createBlog, updateBlog, deleteBlog }