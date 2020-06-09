import React, {useState} from 'react'
import { useQuery } from '@apollo/client';

import queries from '../queries' 


const Books = (props) => {


  const result = useQuery(queries.ALL_BOOKS)
  const [filter, setFilter] = useState(null)

  if (!props.show) {
    return null
  }

  
  if (result.loading)  {
    return <div>loading...</div>
  }


  let books = result.data.allBooks

  console.log("Show books", books )  
  let genres = {}
  books.map( b => b.genres.map( (x) => genres[x] = 1 ))
  genres = Object.keys( genres )
  console.log("Genres:", genres )
  
  if ( filter )
  {
    books = books.filter( (x) => x.genres.includes(filter) )
  }
  
  return (
    <div>
      <h2>books</h2>

      { filter && <h4> Filtered by {filter} </h4> }
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
            <th>
              genres
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
              <td>{a.genres.join(", ") }</td>
            </tr>
          )}
        </tbody>
      </table>

     <div>
       <h3>Filter by genre</h3>
      { genres.map( x => <button key={x} onClick={ () => setFilter(x) }> {x} </button> ) }
       <button onClick={ () => setFilter(null)}> all genres </button>
       </div>
    </div>
  )
}

export default Books