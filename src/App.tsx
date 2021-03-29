import { Switch, Route } from "react-router-dom";
import Header from "./views/partials/Header";
import Home from "./views/Home";
import Detail from "./views/Details";
import Footer from "./views/partials/Footer";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/movies-app/" component={Home} exact />
        <Route path="/movies-app/movie/:id" component={Detail} />
      </Switch>
      <Footer />
    </>
  );
}

export default App;