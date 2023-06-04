import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Route, Switch, Redirect, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import "./App.css";

//components
import Navbar from "./components/Navbar/Navbar";
import Home from './components/Home/Home';
import Footer from "./components/Footer/Footer";
import Helps from "./components/Helps/Helps";

import AnimalTypes from "./components/AnimalTypes/AnimalTypes";
import Animals from "./components/Animals/Animals";
import Locations from "./components/Locations/Locations";
import MovementPoints from "./components/MovementPoints/MovementPoints";



const App = () => {
  const location = useLocation();
  const theme = useSelector((state) => state.theme);
  return (
    <div className="App" style={theme}>
      <Navbar />
      <div className="app-content">
        <TransitionGroup>
          <CSSTransition timeout={300} classNames="fade" key={location.key}>
            <Switch location={location}>
              <Route path="/" exact>
                <Redirect to="/home" />
              </Route>

              <Route path="/home">
                <Home />
              </Route>

              <Route path="/helps">
                <Helps />
              </Route>

              <Route path="/animaltypes">
                <AnimalTypes />
              </Route>

              <Route path="/locations">
                <Locations />
              </Route>

              <Route path="/movementpoints">
                <MovementPoints />
              </Route>

              <Route path="/animals">
                <Animals />
              </Route>

              <Route path="*">
                <Redirect to="/home" />
              </Route>
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      </div>
      <Footer />
    </div>
  );
};

export default App;
