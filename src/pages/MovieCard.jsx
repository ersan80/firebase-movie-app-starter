import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const IMG_API = "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/";
const defaultImage =
  "https://cdn.sanity.io/images/2yyup5mx/production/d5a915cd9db3444998926f61645b6f83a53aced0-5000x2813.jpg";
const MovieCard = ({ poster_path, title, overview, vote_average, id }) => {
  const { isCurrentUser } = useAuthContext();
  const navigate = useNavigate();
  const getVoteClass = (vote) => {
    if (vote >= 8) {
      return "green";
    } else if (vote >= 6) {
      return "orange";
    } else {
      return "red";
    }
  };

    return (
        <div
            className="movie"
            onClick={
                (() => {
                    navigate("/details/" + id);
                    alert("please login see to detail")
                })
      }
    >
      <img
        loading="lazy"
        src={poster_path ? IMG_API + poster_path : defaultImage}
        alt="movie-card"
      />
      <div className="flex align-baseline justify-between p-1 text-white">
        <h5>{title}</h5>
        {isCurrentUser && (
          <span className={`tag ${getVoteClass(vote_average)}`}>
            {vote_average.toFixed(1)}
          </span>
        )}
      </div>
      <div className="movie-over">
        <h2>Overview</h2>
        <p>{overview}</p>
      </div>
    </div>
  );
};

export default MovieCard;
