import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import queries from '../queries'

const Login = (props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [msg, setMessage] = useState('')

    const [login, result] = useMutation(queries.LOGIN, {
        onError: (error) => {
            setMessage(error.graphQLErrors[0].message)
        }
    })

    useEffect(() => {
        if (result.data) {
            const token = result.data.login.value
            props.setToken(token)
            localStorage.setItem('bookapp-user-token', token)
            console.log("Login ok", token)
            setMessage("Logged in OK!")
            props.onLogin()
        }
    }, [result.data]) // eslint-disable-line





    if (!props.show) {
        return null
    }


    const submit = async (event) => {
        event.preventDefault()

        let vars = { variables: { username, password } }
        console.log("Doing login", vars)
        login(vars)
    }

    return (
        <div>
            <div>{msg}</div>
            <form onSubmit={submit}>
                <div>
                    username <input
                        value={username}
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password <input
                        type='password'
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type='submit'>login</button>
            </form>
        </div>
    )
}

export default Login