import React from "react";
import { Link } from "react-router-dom";

const API_IMG = "https://image.tmdb.org/t/p/original/";

const SimilarMovies = ({ title, poster_path, id }) => (
    <div className="col-md-3 col-sm-6" key={id}>
      <div className="card">
        <Link to={`/movies-app/movie/${id}`}>
          <img
            className="img-fluid"
            src={
              poster_path
                ? API_IMG + poster_path
                : "https://cdn.pixabay.com/photo/2016/12/14/23/08/page-not-found-1907792_960_720.jpg"
            }
            alt={title}
          ></img>
        </Link>
      </div>
      <div className="mt-3">
        <p style={{ fontWeight: "bolder" }}>{title}</p>
      </div>
    </div>
);

export default SimilarMovies;