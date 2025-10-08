import React, { useEffect, useState } from "react";
import "regenerator-runtime";
import "./../styles/App.css";

const App = () => {
  const [movieName, setMovieName] = useState("");
  const [movieData, setMovieData] = useState(null);
  const [error,setError] = useState('');

  async function handleSearch() {
    if (!movieName) {
      alert("Enter movie name here");
      return;
    }

    try {
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=99eb9fd1&s=${movieName}`
      );

      if (!response.ok) {
        throw new error("unable to fetch data");
      }

      const data = await response.json();
      if(data.Response==='False'){
        setError("Invalid movie name. Please try again.");
        setMovieData(null);
        return;
      }
      console.log(data);
      setMovieData(data.Search);
      setMovieName("");
      setError('');
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }
  return (
    <div>
      <input
        type="text"
        placeholder="search Movie"
        value={movieName}
        onChange={(e) => setMovieName(e.target.value)}
      />

      <button onClick={handleSearch}>Search</button>
      {error && <div className="error">{error}</div>}
      {movieData && (
        <div className="movie-list">
          {movieData.map((movie,index) => (
            <div className="movie-card" key={`${movie.imdbID}-${index}`}>
              <div className="movie-info">
                <h3>
                  {movie.Title} ({movie.Year})
                </h3>
              </div>
              <img src={movie.Poster} alt={movie.Title} />
            </div>
          ))}
        </div>
      )}
      
    </div>
  );
};

export default App;
