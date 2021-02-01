import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Detail from "./components/Details";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [searchTerm, setSearchTerm] = useState([]);
  const [localSearchTerm, setlocalSearchTerm] = useState([]);

  const handleOnChange = (e) => {
    setlocalSearchTerm(e.target.value);
  };

  const handleSearchMovies = (e) => {
    e.preventDefault();
    setSearchTerm(localSearchTerm);
  };

  return (
    <div className="app">
      <div className="content">
        <nav id="navbar" className="navbar">
          <div class="container-fluid">
            <a className="navbar-brand" href="/movies-app/">
              <h2 className="text-light">Movies</h2>
            </a>
            <form onSubmit={handleSearchMovies} className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={localSearchTerm}
                onChange={handleOnChange}
              />
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
        <div class="footer-top">
          <div class="container">
            <div class="d-flex justify-content-between">
              <div class="col-lg-3 col-md-6 footer-info">
                <h3>Movie</h3>
                <p>We keep you up to date with the latest movies.</p>
              </div>
              <div class="col-lg-3 col-md-6 footer-contact">
                <h4>Contact</h4>
                <p>
                  Elvis Bonilla
                  <br />
                  Venezuela
                  <br />
                  Tachira
                </p>
                <div class="social-links">
                  <a
                    href="https://www.linkedin.com/in/elvis-bonilla-312a071b2/"
                    class="linkein"
                  >
                    <i class="fab fa-linkedin"></i>
                  </a>
                  <a href="https://github.com/NovatoV" class="github">
                    <i class="fab fa-github-square"></i>
                  </a>
                  <a
                    href="https://www.instagram.com/elelvisdaniel/"
                    class="instagram"
                  >
                    <i class="fa fa-instagram"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="container">
          <div class="copyright">
            &copy; Copyright <strong>Movie</strong>. All Rights Reserved
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
