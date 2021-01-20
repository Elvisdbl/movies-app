import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Detail from './components/Details/Details'

function App() {

  const [searchTerm, setSearchTerm] = useState([]);
  const [localSearchTerm, setlocalSearchTerm] = useState([]);

  const handleOnChange = (e) => {
    setlocalSearchTerm(e.target.value);
  }

  const handleSearchButtonClick = (e) => {
    search();
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      search();
    }
  }

  const search = () => {
    setSearchTerm(localSearchTerm);
  }

  return (
    <div>
      <nav className="navbar navbar-light bg-light">
        <div class="container-fluid">
          <a className="navbar-brand" href="/">The-movies</a>
          <div className="d-flex">
            <input
              className="form-control me-2"
              type="search" placeholder="Search"
              aria-label="Search"
              value={localSearchTerm}
              onKeyPress={handleKeyPress}
              onChange={handleOnChange} />
            <button
              className="btn btn-outline-success"
              onClick={handleSearchButtonClick}>
              Search
            </button>
          </div>
        </div>
      </nav>

      <Router>
        <Switch>
          {/* <Route path="/" component={() => <Home prop={'Hola'} />} exact /> */}
          <Route
            path='/'
            render={() => (
              <Home searchTerm={searchTerm} />
            )} exact />
          <Route path="/movie/:id" component={Detail} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
