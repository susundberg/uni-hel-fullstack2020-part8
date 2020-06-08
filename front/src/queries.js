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
    author
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
    author
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


export default { ALL_AUTHORS, ALL_BOOKS, CREATE_BOOK, AUTHOR_SET_BORN  }