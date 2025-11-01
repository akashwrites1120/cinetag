import { useState } from "react";
import FetchMovies from "../api/FetchMovies";


const MoviesPortal = () => {
    const [searchInputText, setSearchInputText] = useState('')
    const [enteredSearchText, setEnteredSearchText] = useState('')
    const [movies, setMovies] = useState([])
    const [error, setError] = useState(null)

    const onSerchTextEnter = (e)=>{
        e.preventDefault()
        FetchMovies(searchInputText, setMovies, setError)
        setEnteredSearchText(enteredSearchText)
    }
  return (
    <>
    <div className="row">
      <div className="col-md-12">
        <form onSubmit={onSerchTextEnter}>
          <input
            type="text"
            placeholder="Search Movie"
            className="form-control"
            value={searchInputText}
            onChange={(e)=> setSearchInputText(e.target.value)}
          />
        </form>
      </div>
    </div>
    {enteredSearchText}
    </>
  );
};

export default MoviesPortal;
