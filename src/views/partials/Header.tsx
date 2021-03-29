import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ResultsBar from "../../components/ResultsBar";
import { setSearchTerm, hideBar, toggleBar } from "../../store/actions";
import { getSearch } from "../../API";

interface IState {
  searchTermReducer: {
    searchTerm: string;
  };
  toggleResultsBar: {
    show: boolean;
  };
}

const Header = () => {
  let { pathname } = useLocation();
  const { searchTerm } = useSelector(
    ({ searchTermReducer }: IState) => searchTermReducer
  );
  const { show } = useSelector(
    ({ toggleResultsBar }: IState) => toggleResultsBar
  );

  const dispatch = useDispatch();

  const [localSearchTerm, setlocalSearchTerm] = useState("");
  const [results, setResult] = useState([]);

  const showHideClassName = show ? "display-block" : "display-none";

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setlocalSearchTerm(e.target.value);
  };

  const handleSearchMovies = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setSearchTerm(localSearchTerm));
    if (pathname !== "/movies-app/") {
      dispatch(toggleBar());
    }
  };

  const displayNoneWithSearchEmpty = () => {
    dispatch(hideBar());
    dispatch(setSearchTerm(""));
  };

  const diplayHide = () => {
    dispatch(hideBar());
  };

  useEffect(() => {
    const requestSearch = async () => {
      setResult(await getSearch(searchTerm));
    };
    requestSearch();
  }, [searchTerm]);

  return (
    <nav id="navbar" className="navbar">
      <div className="container-fluid">
        <Link
          to={`/movies-app`}
          className="navbar-brand"
          onClick={displayNoneWithSearchEmpty}
        >
          <h2 className="text-light">Movies</h2>
        </Link>
        <form onSubmit={handleSearchMovies} className="d-flex">
          <div className="rel">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={localSearchTerm}
              onChange={handleOnChange}
            />
            {results ? (
              <div id="hidden-block" className={showHideClassName}>
                {results.slice(0, 3).map((result) => (
                  <ResultsBar {...result} />
                ))}
                <Link
                  to={`/movies-app`}
                  className="btn btn-secondary"
                  onClick={diplayHide}
                >
                  View More
                </Link>
              </div>
            ) : (
              <div id="hidden-block">We can not find anything</div>
            )}
          </div>
          <button className="btn btn-outline-success">Search</button>
        </form>
      </div>
    </nav>
  );
};

export default Header;
