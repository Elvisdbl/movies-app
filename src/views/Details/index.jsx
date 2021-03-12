import React, { useState, useEffect } from "react";
import SimilarMovies from "../../components/SimilarMovies";
import ReactStars from "react-rating-stars-component";
import { getMoviesDetail, getSimiliarMovies } from "../../API";

export function Detail({ match }) {
  const API_IMG = `https://image.tmdb.org/t/p/original/`;
  let genres = [];
  let productions = [];
  const [details, setDetails] = useState([]);
  const [similarMovie, setSimilarMovie] = useState([]);

  useEffect(() => {
    const requestDetails = async () => {
      setDetails(await getMoviesDetail(match.params.id));
      setSimilarMovie(await getSimiliarMovies(match.params.id));
    };

    // const getSimiliarMovies = () => {
    //   axios
    //     .get(API_SIMILAR)
    //     .then((res) => setSimilarMovie(res.data.results))
    //     .catch((e) => console.log(e));
    // };

    // const getMoviesDetail = () => {
    //   axios
    //     .get(API_DETAILS)
    //     .then((res) => {
    //       console.log(res.data);
    //       setDetails(res.data);
    //     })
    //     .catch((e) => console.log(e));
    // };
    // getMoviesDetail(API_DETAILS);
    // getSimiliarMovies(API_SIMILAR);
    requestDetails();
  });

  // const similarMovieList = similarMovie.slice(0, 4).map((similar) => (
  //   <div className="col-md-3 col-sm-6" key={similar.id}>
  //     <div className="card">
  //       <Link to={`/movies-app/movie/${similar.id}`}>
  //         <img
  //           className="img-fluid"
  //           src={
  //             similar.poster_path
  //               ? API_IMG + similar.poster_path
  //               : "https://cdn.pixabay.com/photo/2016/12/14/23/08/page-not-found-1907792_960_720.jpg"
  //           }
  //           alt={similar.title}
  //         ></img>
  //       </Link>
  //     </div>
  //     <div className="mt-3">
  //       <p style={{ fontWeight: "bolder" }}>{similar.title}</p>
  //     </div>
  //   </div>
  // ));

  genres = details.genres;
  let genresList;
  if (genres) {
    genresList = genres.map((g, i) => (
      <span className="list-inline-item" key={i}>
        <button type="button" className="btn btn-outline-info">
          {g.name}
        </button>
      </span>
    ));
  }

  productions = details.production_companies;
  let productionList;
  if (productions) {
    productionList = productions.map((p, i) => <span key={i}>{p.name}, </span>);
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
          <SimilarMovies key={similar.id} {...similar} />
        ))}
      </div>
    </div>
  );
}

export default Detail;
