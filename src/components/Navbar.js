import React, { useReducer, useRef, useState } from "react";
import "../css/home.css";
import homeimg from "../img/home.png";
import searchimg from "../img/search.png";
import favourite from "../img/favorite.png";
import "boxicons";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const Navbar = () => {
  const history = useHistory();
  const [active, setactive] = useState({ check: 1 });
  return (
    <div>
      <div className="sidenavbar">
        <ul type="none" className="navbarlink" id="firstul">
          <li>
            <img className="navbaricon" src={homeimg} alt="" />
            <Link
              to="/"
              style={{
                color: active.check === 1 ? "white" : "rgb(206, 206, 206)",
              }}
              onClick={() => {
                setactive({ check: 1 });
              }}
            >
              {" "}
              Home
            </Link>
          </li>
          <li>
            <img className="navbaricon" src={searchimg} alt="" />
            <Link
              to="/search"
              style={{
                color: active.check === 2 ? "white" : "rgb(206, 206, 206)",
              }}
              onClick={() => {
                setactive({ check: 2 });
              }}
            >
              Search
            </Link>
          </li>
        </ul>
        <hr style={{ color: "white" }} />
        <ul type="none" className="navbarlink">
          <li>
            <img className="navbaricon" src={favourite} alt="" />
            <Link
              to="/"
              style={{
                color: active.check === 3 ? "white" : "rgb(206, 206, 206)",
              }}
              onClick={() => {
                setactive({ check: 3 });
              }}
            >
              Favourite
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
