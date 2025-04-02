const listHelper = require("../utils/list_helper")

test("dummy returns one", () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

describe("total likes", () => {
    const listWithOneBlog = [
        {
            _id: "5a422aa71b54a676234d17f8",
            title: "Go To Statement Considered Harmful",
            author: "Edsger W. Dijkstra",
            url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
            likes: 5,
            __v: 0
        }
    ]

    test("when list has only one blog equals the likes of that", () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })

    const listWithThreeBlogs = [
        {
            _id: "5a422aa71b54a676234d17f8",
            title: "Go To Statement Considered Harmful",
            author: "Edsger W. Dijkstra",
            url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
            likes: 5,
            __v: 0
        },
        {
            _id: "896asa88g7b7sd9987asd76weeqw67",
            title: "Guitar, the sky and the stars",
            author: "Edward Normal",
            url: "www.eppunormaali.fi",
            likes: 300000,
            __v: 0
        },
        {
            _id: "82d89as7db87cv89asd656897s9d8a",
            title: "On the edge of the milkyway",
            author: "Edward Normal",
            url: "www.eppunormaali.fi",
            likes: 200000,
            __v: 0
        }
    ]

    test("when list has three blogs likes equal the sum of the likes", () => {
        const result = listHelper.totalLikes(listWithThreeBlogs)
        expect(result).toBe(500005)
    })
})

describe("Favourite blog", () => {
    const listWithOneBlog = [
        {
            _id: "5a422aa71b54a676234d17f8",
            title: "Go To Statement Considered Harmful",
            author: "Edsger W. Dijkstra",
            url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
            likes: 5,
            __v: 0
        }
    ]
    const favBlog1 = {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        likes: 5
    }


    test("if only one blog is given, returns that blog", () => {
        const result = listHelper.favoriteBlog(listWithOneBlog)
        expect(result).toEqual(favBlog1)
    })

    const listWithThreeBlogs = [
        {
            _id: "5a422aa71b54a676234d17f8",
            title: "Go To Statement Considered Harmful",
            author: "Edsger W. Dijkstra",
            url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
            likes: 5,
            __v: 0
        },
        {
            _id: "896asa88g7b7sd9987asd76weeqw67",
            title: "Guitar, the sky and the stars",
            author: "Edward Normal",
            url: "www.eppunormaali.fi",
            likes: 300000,
            __v: 0
        },
        {
            _id: "82d89as7db87cv89asd656897s9d8a",
            title: "On the edge of the milkyway",
            author: "Edward Normal",
            url: "www.eppunormaali.fi",
            likes: 200000,
            __v: 0
        }
    ]

    const favBlog = {
        title: "Guitar, the sky and the stars",
        author: "Edward Normal",
        likes: 300000
    }

    test("When given three blogs, returns the one with most likes", () => {
        const result = listHelper.favoriteBlog(listWithThreeBlogs)
        expect(result).toEqual(favBlog)
    })

    const listWithTwoBlogs = [
        {
            _id: "896asa88g7b7sd9987asd76weeqw67",
            title: "Guitar, the sky and the stars",
            author: "Edward Normal",
            url: "www.eppunormaali.fi",
            likes: 300000,
            __v: 0
        },
        {
            _id: "82d89as7db87cv89asd656897s9d8a",
            title: "On the edge of the milkyway",
            author: "Edward Normal",
            url: "www.eppunormaali.fi",
            likes: 300000,
            __v: 0
        }
    ]
    test("When given two blogs with same amount of likes, returns the first one", () => {
        const result = listHelper.favoriteBlog(listWithTwoBlogs)
        expect(result).toEqual(favBlog)
    })
})

describe("Most blogs", () => {
    const listWithOneBlog = [
        {
            _id: "5a422aa71b54a676234d17f8",
            title: "Go To Statement Considered Harmful",
            author: "Edsger W. Dijkstra",
            url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
            likes: 5,
            __v: 0
        }
    ]

    const expexted1 = {
        author: "Edsger W. Dijkstra",
        blogs: 1
    }

    test("returns the author and 1 if given only one blog", () => {
        const result = listHelper.mostBlogs(listWithOneBlog)
        expect(result).toEqual(expexted1)
    })

    const listWithThreeBlogs = [
        {
            _id: "896asa88g7b7sd9987asd76weeqw67",
            title: "Guitar, the sky and the stars",
            author: "Edward Normal",
            url: "www.eppunormaali.fi",
            likes: 300000,
            __v: 0
        },
        {
            _id: "82d89as7db87cv89asd656897s9d8a",
            title: "On the edge of the milkyway",
            author: "Edward Normal",
            url: "www.eppunormaali.fi",
            likes: 200000,
            __v: 0
        },
        {
            _id: "5a422aa71b54a676234d17f8",
            title: "Go To Statement Considered Harmful",
            author: "Edsger W. Dijkstra",
            url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
            likes: 5,
            __v: 0
        }
    ]

    let expected2 = {
        author: "Edward Normal",
        blogs: 2
    }

    test("if given multiple different authors, returns the one with most blogs", () => {
        const result = listHelper.mostBlogs(listWithThreeBlogs)
        expect(result).toEqual(expected2)
    })
})

describe("Most likes", () => {
    const listWithOneBlog = [
        {
            _id: "5a422aa71b54a676234d17f8",
            title: "Go To Statement Considered Harmful",
            author: "Edsger W. Dijkstra",
            url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
            likes: 5,
            __v: 0
        }
    ]

    const expexted1 = {
        author: "Edsger W. Dijkstra",
        likes: 5
    }

    test("returns the author and amount of likes if given only one blog", () => {
        const result = listHelper.mostLikes(listWithOneBlog)
        expect(result).toEqual(expexted1)
    })

    const listWithThreeBlogs = [
        {
            _id: "896asa88g7b7sd9987asd76weeqw67",
            title: "Guitar, the sky and the stars",
            author: "Edward Normal",
            url: "www.eppunormaali.fi",
            likes: 300000,
            __v: 0
        },
        {
            _id: "82d89as7db87cv89asd656897s9d8a",
            title: "On the edge of the milkyway",
            author: "Edward Normal",
            url: "www.eppunormaali.fi",
            likes: 200000,
            __v: 0
        },
        {
            _id: "5a422aa71b54a676234d17f8",
            title: "Go To Statement Considered Harmful",
            author: "Edsger W. Dijkstra",
            url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
            likes: 5,
            __v: 0
        }
    ]

    let expected2 = {
        author: "Edward Normal",
        likes: 500000
    }

    test("if given multiple different authors, returns the one with most likes", () => {
        const result = listHelper.mostLikes(listWithThreeBlogs)
        expect(result).toEqual(expected2)
    })
})