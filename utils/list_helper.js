const lodash = require("lodash")

const dummy = (blogs) => {
    console.log(blogs)
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, currentVal) => sum + currentVal.likes, 0)
}

const favoriteBlog = (blogs) => {
    let favorite = blogs[0]
    blogs.forEach((blog) => {
        if (blog.likes > favorite.likes) {
            favorite = blog
        }
    })
    const retFavorite = { ...favorite }
    delete retFavorite._id
    delete retFavorite.__v
    delete retFavorite.url
    return retFavorite
}

const mostBlogs = (blogs) => {
    const authors = blogs.map((blog) => blog.author)
    const counted = Object.entries(lodash.countBy(authors))
    let author = counted[0]
    counted.forEach((count) => {
        if (count[1] > author[1]) {
            author = count
        }
    })
    return {
        author: author[0],
        blogs: author[1],
    }
}

const mostLikes = (blogs) => {
    const authors = lodash.groupBy(blogs, "author")
    let most = {
        author: "",
        likes: 0,
    }
    for (const [key, val] of Object.entries(authors)) {
        const totLikes = val.reduce((sum, curr) => sum + curr.likes, 0)
        if (totLikes > most.likes) {
            most.author = key
            most.likes = totLikes
        }
    }
    return most
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
}
