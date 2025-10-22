import React from 'react'
import Header from './components/Header'
import MoviesPortal from './components/MoviesPortal'

const App = () => {
  return (
    <div>
      <Header />
      <br />
      <div className='container'>
        <MoviesPortal />
      </div>
    </div>
  )
}

export default App