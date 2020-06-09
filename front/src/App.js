
import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import EditAuthors from './components/EditAuthors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommended from './components/Recommended'
import { useApolloClient } from '@apollo/client'



const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const onLogout = () => {
    console.log("Logout asked!")
    setPage('books')
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }
  const onLogin = () => {
    client.resetStore()
    setPage('books')
  }

  useEffect(() => {
    const token = localStorage.getItem('bookapp-user-token')
    if (token) {
      setToken(token)
    }
  }, [])


  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        {token && <button onClick={() => setPage('editAuthors')}>edit authors</button>}
        <button onClick={() => setPage('books')}>books</button>
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {token && <button onClick={() => setPage('recomend')}> recommended </button>}
        {token && <button onClick={() => onLogout()}> logout </button>}
        {!token && <button onClick={() => setPage('login')}> login </button>}

      </div>

      <Authors
        show={page === 'authors'}
      />
      <EditAuthors onEditDone={ ()=>setPage('authors') }
        show={page === 'editAuthors'}
      />

      <Books
        show={page === 'books'}
      />
      <Login setToken={setToken} onLogin={() => onLogin() }
        show={page === 'login'}
      />

      <NewBook
        show={page === 'add'}
      />

      <Recommended
        show={page === 'recomend'}
      />
    </div>
  )
}

export default App