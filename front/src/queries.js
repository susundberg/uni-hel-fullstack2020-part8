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

const ALL_BOOKS = gql`
query {
  allBooks  {
    title
    author {
      name
    }
    published
    genres
  }
}
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


export default { ALL_AUTHORS, ALL_BOOKS, CREATE_BOOK, AUTHOR_SET_BORN, LOGIN, GENRE_BOOKS , ME }