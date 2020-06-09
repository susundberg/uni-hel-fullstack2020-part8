import { gql } from '@apollo/client';


const ALL_AUTHORS = gql`
query {
  allAuthors  {
    name
    born
    bookCount
  }
}
`

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    author {
      name
    }
    published
    genres
  }
  
`


const ALL_BOOKS = gql`
query {
  allBooks  {
    ...BookDetails
  }
}
${BOOK_DETAILS}
`


const ME = gql`
query {
  me  {
    username
    favoriteGenre
  }
}
`


const GENRE_BOOKS = gql`
query getBookswithGenre($genre: String!) {
  allBooks(genre:$genre)  {
    title
    author {
      name
    }
    published
  }
}
`


const CREATE_BOOK = gql`
mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
  addBook(
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
  ) {
    title
    author { name }
  }
}
`


const BOOK_ADDED = gql`
subscription {
  bookAdded { title }
}
`

console.log("BOOK_ADDED", BOOK_ADDED )


const AUTHOR_SET_BORN = gql`
mutation setBorn($name: String!, $born: Int!) {
    editAuthor(
    name: $name
    setBornTo: $born
   ) {
    name
  }
}
`


const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`


export default { ALL_AUTHORS, ALL_BOOKS, CREATE_BOOK, AUTHOR_SET_BORN, LOGIN, GENRE_BOOKS, BOOK_ADDED, ME }