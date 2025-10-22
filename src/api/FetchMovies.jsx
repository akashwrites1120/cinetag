import React from 'react'

const FetchMovies = async (searchText, moviesCallback, errorCallback) => {
    try {
        const response = await fetch("http://www.omdbapi.com/?apikey=[yourkey]&")
        const data = await response.json

        if(data.response == 'True'){
            console.log(data.search)
            moviesCallback(movieDetails)
        }
    }
  return (
    <div>FetchMovies</div>
  )
}

export default FetchMovies