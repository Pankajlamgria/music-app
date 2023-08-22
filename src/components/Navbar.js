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

      {/* NAV BAR FOR SMALL SCREEN */}
      <div className="phonesidenav">
        <div className="imgcover">
        <Link to="/">
            <img  onClick={() => {
                setactive({ check: 1 });
              }} className="navbaricon" src={homeimg} alt="" />
            </Link>
        </div>
        <div className="imgcover"><Link to="/search" > 
            <img  onClick={() => {
                setactive({ check: 2 });
              }}className="navbaricon" src={searchimg} alt="" />
            </Link></div>
        <div className="imgcover">
            <img  onClick={() => {
              if((localStorage.getItem("musictoken"))){
                setactive({ check: 3 });
                history.push("/liked");
              }
              else{
                history.push("/signin");
              }
              }} className="navbaricon" src={favourite} alt="" />
            </div>
      </div>


      <div className="sidenavbar">
        <ul type="none" className="navbarlink" id="firstul">
          <li>
            <Link to="/">
            <img  onClick={() => {
                setactive({ check: 1 });
              }} className="navbaricon" src={homeimg} alt="" />
            </Link>
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
            <Link to="/search" > 
            <img  onClick={() => {
                setactive({ check: 2 });
              }}className="navbaricon" src={searchimg} alt="" />
            </Link>
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
        <ul type="none" className="navbarlink" style={{display:(localStorage.getItem("musictoken")?"block":"none")}}>
          <li>
            <Link  to="/liked">
            <img  onClick={() => {
                setactive({ check: 3 });
              }} className="navbaricon" src={favourite} alt="" />
            </Link>
            <Link
              to="/liked"
              style={{
                color: active.check === 3 ? "white" : "rgb(206, 206, 206)",
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
