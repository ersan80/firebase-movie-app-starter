import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import { useAuthContext } from "../context/AuthContext";

const API_KEY = process.env.REACT_APP_API_KEY;
const FEATURED_API = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`;
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;

const Main = () => {

  const {isCurrentUser} =useAuthContext()
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState("")
  const getMovie = (API) => {
    setLoading(true)
    axios
      .get(API)
      .then((res) => setMovies(res.data.results))
      .then(()=>setLoading(false))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getMovie(FEATURED_API);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault()

    if (isCurrentUser && search) {
      getMovie(SEARCH_API + search)
      setSearch("")
    }
    else if (!isCurrentUser) {
      alert("please login to see details")
    }
    else {
      alert("please enter atext")
    }
    
    
    
  }

  return (
    <>
      <form className="flex justify-center p-2" onSubmit={handleSubmit}>
        <input type="search"
          className="w-80 h-8 rounded-md outline-none border p-1 m-2"
          placeholder="Search a movie..."
          value={search}
         onChange={(e)=>setSearch(e.target.value)}   
        />
        <button className="text-white"  type="submit">Search</button>
      </form>
      <div className="flex justify-center flex-wrap">
        {loading ? (
          <div
            className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-600 mt-52"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        ) :  movies.map((movie) => <MovieCard key={movie.id} {...movie} />)}
   
  </div></>);
};

export default Main;
