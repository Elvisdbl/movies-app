import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Detail from './components/Details/Details'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Home} exact/>
        <Route path="/movie/:id" component={Detail}/>
      </Switch>
    </Router>
  );
}

export default App;
