import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Movie from "../../components/Movie";
// import Slider from "../../components/Slider";

import { Carousel } from "react-bootstrap";
import { getNowPlaying, getPopular } from "../../API";
import { useSelector } from "react-redux";

const { REACT_APP_API_KEY: API_KEY } = process.env;
function Home() {
  const API_IMG = `https://image.tmdb.org/t/p/original/`;
  const API_SEARCH = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;

  const searchTerm = useSelector((state) => state.searchTermReducer);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [popular, setPopular] = useState([]);
  const [movies, setMovies] = useState([]);
  const [lastSearch, setLastSearch] = useState("");
  const [isInitialized, setIsInitialized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(searchTerm);
    const requestNowPlaying = async () => {
      setNowPlaying(await getNowPlaying());
    };

    const requestPopular = async () => {
      setPopular(await getPopular());
      setLoading(false); // When the api already upload the information the state gets false
    };

    const search = () => {
      // Search API
      const url = `${API_SEARCH}${searchTerm}`;
      console.log(`search ${url}`);
      setMovies([]);
      setLoading(true);
      axios
        .get(url)
        .then((res) => {
          setLoading(false);
          setMovies(res.data.results);
        })
        .catch((e) => console.log(e));
    };

    const initialize = () => {
      // a function that execute the request from NowPlaying and Popular
      requestNowPlaying();
      requestPopular();
    };

    if (!isInitialized) {
      // If the request isn't Initialized it will be executed
      setIsInitialized(true); // get true Initialized
      initialize(); // Execute the request if it's not initialize
    }
    if (searchTerm !== "" && searchTerm !== lastSearch) {
      // if search it's empty and different to the last search it's going to be execute
      setLastSearch(searchTerm); // it change the term of my the search
      search(); // This execute the request to the api in the search url.
    }
  }, [isInitialized, searchTerm, lastSearch, API_SEARCH]);

  const Slider = nowPlaying.slice(0, 3).map((item, id) => {
    return (
      <Carousel.Item key={id}>
        <Link to={`/movies-app/movie/${item.id}`}>
          <img
            src={
              item.backdrop_path
                ? API_IMG + item.backdrop_path
                : "https://cdn.pixabay.com/photo/2017/03/09/12/31/error-2129569_960_720.jpg"
            }
            alt={item.title}
          />
        </Link>
        <Carousel.Caption style={{ background: "#302f2fa1" }}>
          <h3>{item.title}</h3>
        </Carousel.Caption>
      </Carousel.Item>
    );
  });

  return (
    <div>
      <Carousel keyboard={true} nextLabel="" prevLabel="" fade={true}>
        {/* {nowPlaying.slice(0, 3).map((movie) => (
          <Slider key={movie.id} {...movie} />
        ))} */}
        {Slider}
      </Carousel>

      {searchTerm.length ? ( //if searchTerm have something going to show the result instead of it'll show popular.
        <div className="rel">
          <h2 className="tittle-dec"> Showing results for "{searchTerm}" </h2>
        </div>
      ) : (
        <div className="rel">
          <h2 className="tittle-dec"> Showing popular </h2>
        </div>
      )}

      {loading ? ( // if it is true show us the programming Loading if it's false it'll show us the list of the movies
        <div
          style={{ height: "55vh" }}
          className="d-flex justify-content-center align-items-center"
        >
          <div
            className="spinner-border"
            style={{ width: "3rem", height: "3rem" }}
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="container-xxl movie-container">
          {(searchTerm.length ? movies : popular).map((movie) => (
            <Movie key={movie.id} {...movie} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
