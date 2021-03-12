import Axios from "axios";
import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./views/Home";
import Detail from "./views/Details";
import "bootstrap/dist/css/bootstrap.min.css";
const { REACT_APP_API_KEY: API_KEY } = process.env;

function App() {
  const [searchTerm, setSearchTerm] = useState([]);
  const [localSearchTerm, setlocalSearchTerm] = useState([]);
  const [results, setResult] = useState([]);
  const API_IMG = "https://image.tmdb.org/t/p/original/";
  const API_SEARCH = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;

  const handleOnChange = (e) => {
    setlocalSearchTerm(e.target.value);
  };

  const handleSearchMovies = (e) => {
    e.preventDefault();
    let element = document.getElementById("hidden-block");
    if (window.location.pathname !== "/movies-app/") {
      if (element.style.display === "none") {
        element.style.display = "block";
      } else {
        element.style.display = "none";
      }
    }
    setSearchTerm(localSearchTerm);
  };

  useEffect(() => {
    const getResult = (API_SEARCH) => {
      Axios.get(`${API_SEARCH}${searchTerm}`)
        .then((res) => setResult(res.data.results))
        .catch((e) => console.log(e));
    };
    getResult(API_SEARCH);
  }, [API_SEARCH, searchTerm]);

  const ResultsBar = results.slice(0, 3).map((result) => (
    <div className="resultSearch" key={result.id}>
      {/* <Link to={`/movies-app/movie/${result.id}`}> */}
      <img
        src={
          result.poster_path
            ? API_IMG + result.poster_path
            : "https://cdn.pixabay.com/photo/2016/12/14/23/08/page-not-found-1907792_960_720.jpg"
        }
        alt={result.title}
      />
      <div className="description">
        <p>{result.title}</p>
        <p>{result.release_date.slice(0, 4)}</p>
      </div>

      {/* </Link> */}
    </div>
  ));

  return (
    <div className="app">
      <div className="content">
        <nav id="navbar" className="navbar">
          <div className="container-fluid">
            <a className="navbar-brand" href="/movies-app/">
              <h2 className="text-light">Movies</h2>
            </a>
            <form onSubmit={handleSearchMovies} className="d-flex">
              <div className="relative">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={localSearchTerm}
                  onChange={handleOnChange}
                />
                <div id="hidden-block">
                  <div>{ResultsBar}</div>
                  <a className="btn btn-secondary" href="/movies-app/">
                    View More
                  </a>
                </div>
              </div>
              <button className="btn btn-outline-success">Search</button>
            </form>
          </div>
        </nav>

        <Router>
          <Switch>
            <Route
              path="/movies-app/"
              render={() => <Home searchTerm={searchTerm} />}
              exact
            />
            <Route path="/movies-app/movie/:id" component={Detail} />
          </Switch>
        </Router>
      </div>

      <footer className="footer">
        <div className="footer-top">
          <div className="container">
            <div className="d-flex justify-content-between">
              <div className="col-lg-3 col-md-6 footer-info">
                <h3>Movie</h3>
                <p>We keep you up to date with the latest movies.</p>
              </div>
              <div className="col-lg-3 col-md-6 footer-contact">
                <h4>Contact</h4>
                <p>
                  Elvis Bonilla
                  <br />
                  Venezuela
                  <br />
                  Tachira
                </p>
                <div className="social-links">
                  <a
                    href="https://www.linkedin.com/in/elvis-bonilla-312a071b2/"
                    className="linkein"
                  >
                    <i className="fab fa-linkedin"></i>
                  </a>
                  <a href="https://github.com/NovatoV" className="github">
                    <i className="fab fa-github-square"></i>
                  </a>
                  <a
                    href="https://www.instagram.com/elelvisdaniel/"
                    className="instagram"
                  >
                    <i className="fa fa-instagram"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="copyright">
            &copy; Copyright <strong>Movie</strong>. All Rights Reserved
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
