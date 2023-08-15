import React from 'react'
import "../css/card.css"
import playimg from "../img/playtriangle.png";
import musiccontext from '../context/Musincontext';
import { useContext } from 'react';
const Recent = (props) => {
  const contextcontent=useContext(musiccontext);
  const handleplaymusic=async()=>{
    contextcontent.setcurrentsong(props.artist);
    // contextcontent.setcurrentsong({...contextcontent.setcurrentsong,length:0,ct:0});
  }
  return (
    <div>
    <div className="card">
    <div className="songimg">
        <img id="musicimg" src={`${props.artist.imgurl}`} alt="" />
        <div className="playlogo">
          <img src={playimg} onClick={handleplaymusic} alt="" />
        </div>
      </div>
      <div className="songdetails">
          <span>{props.artist.songname}</span>
      </div>
    </div>
  </div>
  )
}

export default Recent
