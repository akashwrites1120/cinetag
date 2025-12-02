import { useState, useEffect } from "react";
import { fetchMovies } from "../api/FetchMovies";
import ErrorAlert from "./ErrorAlert";
import MovieDetails from "./MovieDetails";

function MoviesPortal() {
  const [searchInputText, setSearchInputText] = useState("");
  const [enteredSearchText, setEnteredSearchText] = useState("");
  const [movies, setMovies] = useState(null); // null = not loaded yet, [] = no results
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch multiple different movies on initial load
    const searchTerms = [
      "Action",
      "Comedy",
      "Drama",
      "Thriller",
      "Adventure",
      "Animation",
      "Romance",
      "Horror",
    ];

    setLoading(true);
    let allMovies = [];
    let completedRequests = 0;
    let hasError = false;

    // Shuffle and pick 4-5 random genres
    const shuffledTerms = searchTerms.sort(() => Math.random() - 0.5);
    const selectedTerms = shuffledTerms.slice(0, 5);

    selectedTerms.forEach((term) => {
      fetchMovies(
        term,
        (data) => {
          // Get 2 random movies from each search result
          const randomMovies = data.sort(() => Math.random() - 0.5).slice(0, 2);
          allMovies = [...allMovies, ...randomMovies];
          completedRequests++;

          if (completedRequests === selectedTerms.length) {
            // Remove duplicates based on imdbID and shuffle
            const uniqueMovies = Array.from(
              new Map(allMovies.map((movie) => [movie.imdbID, movie])).values()
            ).sort(() => Math.random() - 0.5);

            setMovies(uniqueMovies);
            setLoading(false);
          }
        },
        (err) => {
          if (!hasError) {
            hasError = true;
            setError(err);
            setLoading(false);
          }
        },
        () => {}
      );
    });
  }, []);

  const onSearchTextEnter = (e) => {
    e.preventDefault();
    if (!searchInputText.trim()) return;

    setLoading(true);
    setMovies(null);
    setError(null);

    fetchMovies(
      searchInputText,
      (data) => {
        setMovies(data);
        setLoading(false);
      },
      (err) => {
        setError(err);
        setLoading(false);
      },
      () => {
        setEnteredSearchText(searchInputText);
        setLoading(false);
      }
    );
  };

  const handleTagClick = (tag) => {
    setSearchInputText(tag);
    setEnteredSearchText(tag);
    setLoading(true);
    setMovies(null);
    setError(null);

    fetchMovies(
      tag,
      (data) => {
        setMovies(data);
        setLoading(false);
      },
      (err) => {
        setError(err);
        setLoading(false);
      },
      () => {
        setLoading(false);
      }
    );
  };

  const popularTags = [
    "Action",
    "Comedy",
    "Drama",
    "Romance",
    "Thriller",
    "Horror",
    "Sci-Fi",
    "Adventure",
  ];

  return (
    <div className="min-h-[80vh] pb-16">
      <div className="text-center py-8 sm:py-12 max-w-2xl mx-auto px-4">
        <h1 className="mb-4 sm:mb-6 text-3xl sm:text-4xl font-bold">
          Find Your Next Favorite Movie
        </h1>
        <div>
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search for movies..."
              className="w-full px-4 py-3 pl-12 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              value={searchInputText}
              onChange={(e) => setSearchInputText(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  onSearchTextEnter(e);
                }
              }}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>

          {/* Popular Tags */}
          <div className="overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="flex flex-nowrap sm:flex-wrap gap-2 justify-start sm:justify-center min-w-max sm:min-w-0">
              {popularTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  className="px-4 py-1.5 text-sm bg-gray-800/50 hover:bg-indigo-500/20 border border-gray-700 hover:border-indigo-500 rounded-full text-gray-300 hover:text-indigo-400 transition-all duration-200 whitespace-nowrap"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {loading && (
        <div className="text-center py-16 flex justify-center">
          <div className="w-12 h-12 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
        </div>
      )}

      {!loading && error && (
        <ErrorAlert
          error={error}
          searchTerm={enteredSearchText || "Random Selection"}
        />
      )}

      {!loading && movies && movies.length > 0 && (
        <>
          <p className="text-gray-400 mb-6 px-4">
            {enteredSearchText ? (
              <>
                Found {movies.length} results for{" "}
                <span className="text-white font-semibold">
                  "{enteredSearchText}"
                </span>
              </>
            ) : (
              <>Recommended Movies</>
            )}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-6 px-4">
            {movies.map((movie) => (
              <MovieDetails key={movie.imdbID} movie={movie} />
            ))}
          </div>
        </>
      )}

      {!loading && movies && movies.length === 0 && !error && (
        <div className="text-center text-gray-400 mt-16">
          <p>No movies found. Try searching for something else.</p>
        </div>
      )}
    </div>
  );
}

export default MoviesPortal;
