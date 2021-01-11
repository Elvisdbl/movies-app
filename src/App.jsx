import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Detail from './components/Details/Details'
// import { Container, Navbar, Form, FormControl, Button } from 'react-bootstrap';

function App() {

  // const API_KEY = "96a1b3764e5654a82e0ee8f34ad97731";
  // const API_SEARCH = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;
  const [searchTerm, setSearchTerm] = useState([]);

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
  }

  return (
    <div>
      <nav className="navbar navbar-light bg-light">
        <div class="container-fluid">
          <a className="navbar-brand" href="/">The-movies</a>
          <form className="d-flex">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={searchTerm} onChange={handleOnChange} />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
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
