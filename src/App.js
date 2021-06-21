import React, { useCallback, useEffect, useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {

  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  //API send data in JSON format, standardowy format dla api

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('https://swapi.dev/api/films/');
      //konwersja json na js, dostaje to co w dokumentacji, obiekt

      if (!response.ok) {
        throw new Error(response.status);
      }

      const data = await response.json();

      const transformedMovies = data.results.map(movieData => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          releaseDate: movieData.release_date,
          openingText: movieData.opening_crawl
        };
      });
      //konwersja otrzymanych danych na pasujacy obiekt, ktory jest przesylany w do komponentu 
      setMovies(transformedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
}, []);

useEffect(()=>{
  fetchMoviesHandler();
}, [fetchMoviesHandler]);

//lub wersja jak ponizej

// const fetchMoviesHandler = () => {
//   fetch('https://swapi.dev/api/films/')
//     .then((response) => {
//       return response.json();
//     })
//     //konwersja json na js, dostaje to co w dokumentacji, obiekt
//     .then((data) => {
//       const transformedMovies = data.results.map(movieData => {
//         return {
//           id: movieData.episode_id,
//           title: movieData.title,
//           releaseDate: movieData.release_date,
//           openingText: movieData.opening_crawl
//         };
//       });
//       //konwersja otrzymanych danych na pasujacy obiekt, ktory jest przesylany w do komponentu 
//       setMovies(transformedMovies);
//     })
// };
//console.log(error);
return (
  <React.Fragment>
    <section>
      <button onClick={fetchMoviesHandler}>Fetch Movies</button>
    </section>
    <section>
      {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
      {isLoading && <p>Loading...</p>}
      {!isLoading && !error && movies.length === 0 && <p>Found no movies ;(</p> }
      {!isLoading && error && <p>{error}</p>}
    </section>
  </React.Fragment>
);
}

export default App;
