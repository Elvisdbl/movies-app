import React from "react";
import { Link } from "react-router-dom";

const IMG_API = "https://image.tmdb.org/t/p/original/";

type Props = {
  title: string,
  poster_path: string,
  overview: string,
  id : number,
};

const Movie = ({ title, poster_path, overview, id }:Props) => (
  <div className="movie" style={{ width: "18rem" }}>
    <Link to={`/movies-app/movie/${id}`}>
      <img
        src={
          poster_path
            ? IMG_API + poster_path
            : "https://cdn.pixabay.com/photo/2016/12/14/23/08/page-not-found-1907792_960_720.jpg"
        }
        className="card-img-top"
        alt={title}
      />
    </Link>
    <div style={{ padding: "1rem" }}>
      <h4>{title}</h4>
      <p>{overview.slice(0, 130)}</p>
    </div>
  </div>
);

export default Movie;
