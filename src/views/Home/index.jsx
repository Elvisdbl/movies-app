import Axios from "axios";
import React, { useState, useEffect } from "react";
import Movie from "../../components/Movie";
import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
const { REACT_APP_API_KEY: API_KEY } = process.env;

function Home({ searchTerm }) {
  const API_IMG = "https://image.tmdb.org/t/p/original/";
  const API_POPULAR = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;
  const API_SEARCH = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;
  const [nowPlaying, setNowPlaying] = useState([]);
  const [popular, setPopular] = useState([]);
  const [movies, setMovies] = useState([]);
  const [lastSearch, setLastSearch] = useState("");
  const [isInitialized, setIsInitialized] = useState(false);
  const [loading, setLoading] = useState(true);
  const getNowPlaying = () => {
    console.log("getNowPlaying");
    Axios.get(`https://api.themoviedb.org/3/movie/now_playing`, {
      params: {
        api_key: API_KEY,
      },
    })
      .then((res) => {
        setNowPlaying(res.data.results);
      })
      .catch((e) => console.log(e));
  };

  const getPopular = (API) => {
    console.log("getPopular");
    Axios.get(API)
      .then((res) => {
        setPopular(res.data.results);
        setLoading(false);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    const search = () => {
      const url = `${API_SEARCH}${searchTerm}`;
      console.log(`search ${url}`);
      setMovies([]);
      setLoading(true);
      Axios.get(url)
        .then((res) => {
          setLoading(false);
          setMovies(res.data.results);
        })
        .catch((e) => console.log(e));
    };

    const initialize = () => {
      getNowPlaying();
      getPopular(API_POPULAR);
    };

    if (!isInitialized) {
      setIsInitialized(true);
      initialize();
    }
    if (searchTerm !== "" && searchTerm !== lastSearch) {
      setLastSearch(searchTerm);
      search();
    }
  }, [API_POPULAR, API_SEARCH, isInitialized, lastSearch, searchTerm]);

  const slider = nowPlaying.slice(0, 3).map((item, id) => {
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
        {slider}
      </Carousel>

      {searchTerm.length ? (
        <div className="rel">
          <h2 className="tittle-dec"> Showing results for "{searchTerm}" </h2>
        </div>
      ) : (
        <div className="rel">
          <h2 className="tittle-dec"> Showing popular </h2>
        </div>
      )}
      {loading ? (
        <div
          style={{ height: "55vh" }}
          class="d-flex justify-content-center align-items-center"
        >
          <div
            class="spinner-border"
            style={{ width: "3rem", height: "3rem" }}
            role="status"
          >
            <span class="visually-hidden">Loading...</span>
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
