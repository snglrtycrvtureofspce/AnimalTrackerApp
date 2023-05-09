import logo from './logo.svg';
import './App.css';
import {Home} from './Home';
import {AnimalTypes} from './AnimalTypes';
import {Animals} from './Animals';
import {Locations} from './Locations';
import {MovementPoints} from './MovementPoints';
import {BrowserRouter, Route, Switch, NavLink} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <div className="App container">
      <h3 className="d-flex justify-content-center m-3">
        Restful API сервис для отслеживания перемещения животных
      </h3>

      <nav className="navbar navbar-expand-sm bg-light navbar-dark">
        <ul className="navbar-nav">
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/home">
              Домашняя страница
            </NavLink>
          </li>
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/animaltypes">
              Типы животных
            </NavLink>
          </li>
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/animals">
              Животные
            </NavLink>
          </li>
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/locations">
              Локации
            </NavLink>
          </li>
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/movementpoints">
              Точки перемещения
            </NavLink>
          </li>
        </ul>
      </nav>

      <Switch>
        <Route path='/home' component={Home}/>
        <Route path='/animaltypes' component={AnimalTypes}/>
        <Route path='/animals' component={Animals}/>
        <Route path='/locations' component={Locations}/>
        <Route path='/movementpoints' component={MovementPoints}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
