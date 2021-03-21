import React, { useState, useEffect } from "react";
import Movie from "../../components/Movie";
import { getSearch } from "../../API";
import Slider from "../../components/Slider";

import { Carousel } from "react-bootstrap";
import { getNowPlaying, getPopular } from "../../API";
import { useSelector } from "react-redux";

const Home = () => {
  const searchTerm = useSelector((state) => state.searchTermReducer);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [popular, setPopular] = useState([]);
  const [movies, setMovies] = useState([]);
  const [lastSearch, setLastSearch] = useState("");
  const [isInitialized, setIsInitialized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const requestNowPlaying = async () => {
      setNowPlaying(await getNowPlaying());
    };

    const requestPopular = async () => {
      setPopular(await getPopular());
      setLoading(false); // When the api already upload the information the state gets false
    };

    const requestSearch = async () => {
      setMovies([]);
      setLoading(true);
      try {
        setMovies(await getSearch(searchTerm));
        setLoading(false);
      } catch (e) {
        console.log("error");
      }
    };

    const initialize = () => { // a function that execute the request from NowPlaying and Popular
      requestNowPlaying();
      requestPopular();
    };

    if (!isInitialized) {// If the request isn't Initialized it will be executed
      setIsInitialized(true); // get true Initialized
      initialize(); // Execute the request if it's not initialize
    }
    if (searchTerm !== "" && searchTerm !== lastSearch) { // if search it's empty and different to the last search it's going to be execute
      setLastSearch(searchTerm); // it change the term of my the search
      requestSearch(); // This execute the request to the api in the search url.
    }
  }, [isInitialized, lastSearch, searchTerm]);

  return (
    <div>
      <Carousel keyboard={true} nextLabel="" prevLabel="" fade={true}>
        {nowPlaying.slice(0, 3).map((movie,index) => (
          <Carousel.Item key={index}>
          <Slider key={movies.id} {...movie} />
          </Carousel.Item>
        ))}
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
