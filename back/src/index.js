const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')


const models = require('./models')
const database = require('./database')
const jwt = require('jsonwebtoken')
const config = require('./config')


const typeDefs = gql`
type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int
}

type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }


type Token {
    value: String!
  }

type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ) : Book
    editAuthor(
        name: String!
        setBornTo: Int
    ) : Author

    createUser(
        username: String!
        favoriteGenre: String!
      ): User
      login(
        username: String!
        password: String!
      ): Token

  }  
`

const mutationAddBook = async (root, args, context ) => {


    const currentUser = context.currentUser

    if (!currentUser) {
      throw new AuthenticationError("not authenticated")
    }

    let author = await models.Author.findOne({ name: args.author })

    if (!author) {
        console.log("Author not found, adding")

        try {
            author = await models.Author({ name: args.author }).save()
        }
        catch (error) {
            throw new UserInputError(error.message, {
                invalidArgs: args,
            })
        }
    }

    try {
        const booksaved = await models.Book({ ...args, author: author._id })
            .populate('author', { name: 1 })
            .save()

        console.log("Before pop", booksaved)
        const book = await booksaved.execPopulate()
        console.log("Got book", book)
        return book
    } catch (error) {
        throw new UserInputError(error.message, {
            invalidArgs: args,
        })
    }

}

const mutationEditAuthor = async (root, args, context ) => {


    const currentUser = context.currentUser

    if (!currentUser) {
      throw new AuthenticationError("not authenticated")
    }

    let author = await models.Author.findOne({ name: args.name })
    if (!author)
        return null

    if (args.setBornTo)
        author.born = args.setBornTo
    console.log("Author updated", author)

    await author.save()
    return author
}

const mutationCreateUser = async (root, args) => {

    console.log("Create user:", args)
    const user = new models.User(args)
    return user.save()
        .catch(error => {
            throw new UserInputError(error.message, {
                invalidArgs: args,
            })
        })
}

const mutationLogin = async (root, args) => {
    const user = await models.User.findOne({ username: args.username })

    if (!user || args.password !== 'secret') {
        throw new UserInputError("wrong credentials")
    }

    const userForToken = {
        username: user.username,
        id: user._id,
    }

    return { value: jwt.sign(userForToken, config.TOKEN_SECRET) }
}

const resolvAllBooks = async (root, args) => {

    let filters = {}

    if (args.author) {
        let author = await models.Author.findOne({ name: args.author })

        if (!author)
            return null

        filters["author"] = author._id
    }

    if (args.genre)
        filters["genres"] = args.genre

    console.log("Find:", filters)
    const res = await models.Book.find(filters).populate('author', { name: 1 })
    console.log("Found:", res)
    return res
}

const resolvers = {
    Query: {
        bookCount: () => models.Book.collection.countDocuments(),
        authorCount: () => models.Author.collection.countDocuments(),
        allBooks: resolvAllBooks,
        allAuthors: () => models.Author.find(),
        me: (root, args, context) => context.currentUser,
    },
    Author: {
        bookCount: async (root) => models.Book.countDocuments({ author: root.id })
    },
    Mutation: {
        addBook: mutationAddBook,
        editAuthor: mutationEditAuthor,
        createUser: mutationCreateUser,
        login: mutationLogin,
    }
}
const context = async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
        const decodedToken = jwt.verify(
            auth.substring(7), config.TOKEN_SECRET
        )
        const currentUser = await User
            .findById(decodedToken.id)
        return { currentUser }
    }
}


const server = new ApolloServer({
    typeDefs,
    resolvers,
    context
})

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
})
