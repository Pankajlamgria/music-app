import React, { useContext } from "react";
import "../css/card.css";
import playimg from "../img/playtriangle.png";
import musiccontext from "../context/Musincontext";
const Artistcard = (props) => {
  const contextcontent=useContext(musiccontext);
  const handlesetsonglist=async()=>{
    await contextcontent.getartistsong(props.artist.artistname);
    localStorage.setItem("album","artist");
    localStorage.setItem("albumtype",props.artist.artistname);
    localStorage.setItem("index",0);
  }
  return (
    <div>
      <div className="card">
        <div className="songimg">
          <img id="musicimg" src={`${props.artist.imgurl}`} alt="" />
          <div className="playlogo">
            <img src={playimg} onClick={handlesetsonglist} alt="" />
          </div>
        </div>
        <div className="songdetails">
          <span>Artist - {props.artist.artistname}</span>
        </div>
      </div>
    </div>
  );
};

export default Artistcard;
