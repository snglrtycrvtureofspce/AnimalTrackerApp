import React from "react";
import { NavLink } from "react-router-dom";
function Dropdown(props) {
    return (
        <React.Fragment>
            <NavLink activeClassName="active" to="/home">
                <div className="navs">Домашняя страница</div>
            </NavLink>

            <NavLink to="/animaltypes" activeClassName="active">
                <div className="navs">Типы животных</div>
            </NavLink>

            <NavLink to="/animals" activeClassName="active">
                <div className="navs">Животные</div>
            </NavLink>

            <NavLink to="/locations" activeClassName="active">
                <div className="navs">Локации</div>
            </NavLink>

            <NavLink to="/movementpoints" activeClassName="active">
                <div className="navs">Точки перемещения</div>
            </NavLink>
            
            <NavLink to="/helps" activeClassName="active">
                <div className="navs">Обратная связь</div>
            </NavLink>
        </React.Fragment>
    )
}
export default Dropdown;