import React from "react";
import { Link } from "react-router-dom";

const API_IMG = "https://image.tmdb.org/t/p/original/";

const ResultsBar = ({ title, poster_path, release_date, id }) => (
  <Link to={`/movies-app/movie/${id}`} className="resultSearch" key={id}>
    <img
      src={
        poster_path
          ? API_IMG + poster_path
          : "https://cdn.pixabay.com/photo/2016/12/14/23/08/page-not-found-1907792_960_720.jpg"
      }
      alt={title}
    />
    <div className="description">
      <p>{title}</p>
      <p>{release_date.slice(0, 4)}</p>
    </div>
  </Link>
);

export default ResultsBar;
