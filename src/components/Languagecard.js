import React from 'react'
import "../css/card.css"
import playimg from "../img/playtriangle.png";
import musiccontext from '../context/Musincontext';
import { useContext } from 'react';
const Languagecard = (props) => {
  const contextcontent=useContext(musiccontext);
  const handlesonglist=async()=>{
    await contextcontent.getlanguagesong(props.artist.language);
    localStorage.setItem("album","language");
    localStorage.setItem("albumtype",props.artist.language);
    localStorage.setItem("index",0);
  }
  return (

    <div>
      <div className="card">
      <div className="songimg">
          <img id="musicimg" src={`${props.artist.imgurl}`} alt="" />
          <div className="playlogo">
            <img src={playimg} alt="" onClick={async()=>{
              handlesonglist();
              await contextcontent.audioelem.current.load();
              await contextcontent.audioelem.current.play();
              contextcontent.audioelem.current.currentTime=0;
              contextcontent.setisplay(true);
            }}/>
          </div>
        </div>
        <div className="songdetails">
            <span>{props.artist.language}</span>
        </div>
      </div>
    </div>
  )
}

export default Languagecard
