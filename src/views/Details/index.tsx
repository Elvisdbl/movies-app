import React, { useState, useEffect } from "react";
import { getMoviesDetail, getSimiliarMovies } from "../../API";
import SimilarMovies from "../../components/SimilarMovies";
import ReactStars from "react-rating-stars-component";

type Match = {
  match: {
    params: {
      id: number;
    };
  };
};

interface IResults {
  id?: number;
  title: string;
  poster_path?: string;
  tagline?: string;
  backdrop_path?: string;
  vote_average?: number;
  original_language?: string;
  release_date?: string;
  overview?: string;
  genres?: Array<IGenres>;
  production_companies?: Array<IProductions>;
}

interface IGenres {
  name: string;
}

interface IProductions {
  name: string;
}

// interfaces

const Detail = ({ match }: Match) => {
  const API_IMG = `https://image.tmdb.org/t/p/original/`;
  // let genres;
  // let productions;
  const [details, setDetails] = useState({} as IResults);
  const [similarMovie, setSimilarMovie] = useState([]);

  useEffect(() => {
    const requestDetails = async () => {
      setDetails(await getMoviesDetail(match.params.id));
      setSimilarMovie(await getSimiliarMovies(match.params.id));
    };
    requestDetails();
  }, [match.params.id]);

  let genres = details.genres;
  let genresList;
  if (genres) {
    genresList = genres.map((genre, i: number) => (
      <span className="list-inline-item" key={i}>
        <button type="button" className="btn btn-outline-info">
          {genre.name}
        </button>
      </span>
    ));
  }

  let productions = details.production_companies;
  let productionList;
  if (productions) {
    productionList = productions.map((production, i) => (
      <span key={i}>{production.name}, </span>
    ));
  }

  return (
    <div>
      <div
        className="bgimg"
        style={{ backgroundImage: `url(${API_IMG}${details.backdrop_path})` }}
      >
        <div
          className="bgimg d-flex justify-content-between"
          style={{ background: "#353738bb" }}
        >
          <img
            style={{ width: "35%", padding: "1rem" }}
            src={
              details.poster_path
                ? API_IMG + details.poster_path
                : "https://cdn.pixabay.com/photo/2016/12/14/23/08/page-not-found-1907792_960_720.jpg"
            }
            alt={details.title}
          />
          <div style={{ width: "65%", padding: "1rem" }}>
            <div className="rel text-light">
              <h3 className="h1 tittle-dec">{details.title}</h3>
            </div>
            <div className="d-flex flex-column justify-content-between">
              <em>{details.tagline}</em> <br />
              <b>
                Language: {details.original_language} <br />
                Release date: {details.release_date}
              </b>
              <div className="overview">
                <h6 className="h4">Overview</h6>
                <p>{details.overview}</p>
              </div>
              <div className="overview">
                <h6>Companies:</h6>
                {productionList}
              </div>
              <div>
                <p style={{ margin: "0", padding: "0" }}>
                  Rated: {details.vote_average}
                </p>
                <ReactStars
                  style={{ margin: "0", padding: "0" }}
                  count={details.vote_average}
                  size={40}
                  color1={"#f4c10f"}
                ></ReactStars>
              </div>
              <div>{genresList}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="rel text-light">
        <h3 className="h2 tittle-dec">Similar Movies</h3>
      </div>
      <div style={{ margin: "0 auto" }} className="row mt-3">
        {similarMovie.slice(0, 4).map((similar) => (
          <SimilarMovies {...similar} />
        ))}
      </div>
    </div>
  );
};

export default Detail;
