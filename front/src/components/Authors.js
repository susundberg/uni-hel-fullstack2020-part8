  
import React, { useState } from 'react'

import { useQuery, useMutation } from '@apollo/client';


import queries from '../queries' 



const AuthorBorn = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

   const [setBornMut] = useMutation(queries.AUTHOR_SET_BORN, {
     refetchQueries: [{ query: queries.ALL_AUTHORS }, ]
   })


  const submit = async (event) => {
    event.preventDefault()

    const variables = { name,  born: Number(born) }
    console.log('modify author...', variables)
    setBornMut({ variables })


    setName('')
    setBorn('')
  }


  return (
    <div>
      <form onSubmit={submit}>
        <div>
          Name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>

        <div>
          Born
          <input
            type='number'
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        
        <button type='submit'>Modify</button>
      </form>
    </div>
  )
}


const Authors = (props) => {

  const result = useQuery(queries.ALL_AUTHORS)

  if (!props.show) {
    return null
  }
  
  if (result.loading)  {
    return <div>loading...</div>
  }

  const authors = result.data.allAuthors

  console.log('Authors', authors)


  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      <h3> Modify author </h3>
      <AuthorBorn/>

    </div>
  )
}

export default Authors
