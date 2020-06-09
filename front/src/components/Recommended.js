import React from 'react'
import { useQuery } from '@apollo/client';

import queries from '../queries'


const Recommended = (props) => {



    const userResult = useQuery(queries.ME)
    let favGenre = "__INVALID__" // Not sure why, the SKIP parameter on the query seems not working; the skip is true but the query is made and 400 received. Fuckers.
    if ( !userResult.loading )
    {
        console.log("User done", userResult.data )
        if ( userResult.data.me )
           favGenre = userResult.data.me.favoriteGenre
    }
    
    const variables = { genre: favGenre }
    console.log("Query vars", variables)

    const params = { variables, skip: !favGenre }
    console.log("Query params", params )
    const result = useQuery(queries.GENRE_BOOKS, params )

    if (!props.show) {
        return null
    }


    if (result.loading || userResult.loading ) {
        return <div>loading...</div>
    }

    if ( !userResult.data.me ) {
        return <div>User not found .. </div>
    }

    let books = result.data.allBooks

    console.log("Show books", books)


    return (
        <div>
            <h2>Read these books</h2>
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
                        </tr>
                    )}
                </tbody>
            </table>
        </div>

    )
}

export default Recommended