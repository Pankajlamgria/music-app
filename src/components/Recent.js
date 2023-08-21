import React from "react";
import "../css/card.css";
import playimg from "../img/playtriangle.png";
import Loading from "../img/loading.png";
import musiccontext from "../context/Musincontext";
import { useContext, useState } from "react";
const Recent = (props) => {
  const [loading, setloading] = useState(true);
  const contextcontent = useContext(musiccontext);
  const handleplaymusic = async () => {
    contextcontent.setmusicplayerloading(true);
    contextcontent.setcurrentsong(props.artist);
    contextcontent.setisplay(true);
    contextcontent.audioelem.current.currentTime = 0;
  };
  return (
    <div>
      <div className="card">
        <div className="songimg">
            <img
              style={{ display: loading ? "block" : "none" }}
              src={Loading}
              id="imgloading"
              alt="loading"
            />
          <img id="musicimg" style={{ display: loading ? "none" : "block" }}  onLoad={()=>{
            setloading(false);
          }} src={`${props.artist.imgurl}`} alt="" />
          <div className="playlogo">
            <img src={playimg} onClick={handleplaymusic}  alt="" />
          </div>
        </div>
        <div className="songdetails">
          <span>{props.artist.songname}</span>
        </div>
      </div>
    </div>
  );
};

export default Recent;
