import { useState } from "react";


const MoviesPortal = () => {
    const [searchInputText, setSearchInputText] = useState('')
  return (
    <div className="row">
      <div className="col-md-12">
        <form>
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
  );
};

export default MoviesPortal;
