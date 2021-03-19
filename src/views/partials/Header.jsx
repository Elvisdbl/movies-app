import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ResultsBar from "../../components/ResultsBar";
import { setSearchTerm } from "../../store/actions";

const { REACT_APP_API_KEY: API_KEY } = process.env;

const Header = () => {
  const searchTerm = useSelector((state) => state.searchTermReducer);
  const dispatch = useDispatch();

  // const [searchTerm, setSearchTerm] = useState([]);
  const [localSearchTerm, setlocalSearchTerm] = useState([]);
  const [results, setResult] = useState([]);
  const API_SEARCH = "https://api.themoviedb.org/3/search/movie";

  const handleOnChange = (e) => {
    setlocalSearchTerm(e.target.value);
  };

  const handleSearchMovies = (e) => {
    e.preventDefault();
    if (window.location.pathname !== "/movies-app/") {
      let element = document.getElementById("hidden-block");
      if (element.style.display === "none") {
        element.style.display = "block";
      } else {
        element.style.display = "none";
      }
    }
    dispatch(setSearchTerm(localSearchTerm || ""));
  };

  useEffect(() => {
    // const requestSearch = async () => {
    //   setResult(await getSearch(searchTerm));
    // };
    const getResult = (API_SEARCH) => {
      axios
        .get(`${API_SEARCH}`, {
          params: {
            api_key: API_KEY,
            query: searchTerm,
          },
        })
        .then((res) => {
          setResult(res.data.results);
        })
        .catch((e) => console.log(e));
    };
    getResult(API_SEARCH);
    // requestSearch();
  }, [searchTerm]);

  return (
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
              {results.slice(0, 3).map((result) => (
                <ResultsBar key={result.id} {...result} />
              ))}
              <Link to={`/movies-app`} className="btn btn-secondary">
                View More
              </Link>
            </div>
          </div>
          <button className="btn btn-outline-success">Search</button>
        </form>
      </div>
    </nav>
  );
};

export default Header;
