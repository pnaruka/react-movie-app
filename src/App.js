import { React, useEffect, useState } from 'react';
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';

// apikey = a4c11d02
const API_URL = process.env.REACT_APP_API_URL;
const App = () => {

    const [ movies, setMovies ] = useState([]);
    const [ searchTerm, setSearchTerm ] = useState('')
    
    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();
        setMovies(data.Search);
        //console.log(movies);
    }

    useEffect(
        () => {
            searchMovies('The');
        }, []
    );

    return (
        <div className="app">
            <h1>Natyam</h1>
            <div className='search'>
                <input placeholder='Search movie'
                    value={searchTerm}
                    onChange={(e) => { setSearchTerm(e.target.value) }}
                />
                <img
                    src={SearchIcon}
                    alt="Search"
                    onClick={()=>{searchMovies(searchTerm)}}
                />
            </div>
            {
                movies?.length > 0
                    ? (
                        <div className='container'>
                            {movies.map(movie => (
                            <MovieCard movie={movie} key={movie.imdbID}/>))}

                        </div>
                    ) : (
                        <div className='empty'>
                            <h2>No movies found.</h2>
                        </div>
                    )
            }

        </div>
    )
}

export default App;