import React, { useState } from 'react'

import { useMutation } from '@apollo/client';


import queries from '../queries'



const EditAuthors = (props) => {
    const [name, setName] = useState('')
    const [born, setBorn] = useState('')

    const [setBornMut] = useMutation(queries.AUTHOR_SET_BORN, {
        refetchQueries: [{ query: queries.ALL_AUTHORS },]
    })

    if (!props.show) {
        return null
    }

    const submit = async (event) => {
        event.preventDefault()

        const variables = { name, born: Number(born) }
        console.log('modify author...', variables)
        setBornMut({ variables })


        setName('')
        setBorn('')
        props.onEditDone()
    }


    return (
        <div>
            <h3> Modify author </h3>
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

export default EditAuthors