import React, { useContext } from 'react'
import "../css/card.css"
import playimg from "../img/playtriangle.png";
import musiccontext from "../context/Musincontext";
const Songtype = (props) => {
  const contextcontent=useContext(musiccontext);
  const handlesetsonglist=async()=>{
    await contextcontent.getsongtypesong(props.artist.songtype);
    localStorage.setItem("album","songtype");
    localStorage.setItem("albumtype",props.artist.songtype);
    localStorage.setItem("index",0);
  }
  return (
    <div>
    <div className="card">
    <div className="songimg">
          <img id="musicimg" src={`${props.artist.imgurl}`} alt="" />
          <div className="playlogo">
            <img src={playimg} onClick={()=>{
              handlesetsonglist();
              contextcontent.audioelem.current.play();
              contextcontent.audioelem.current.currentTime=0;
              contextcontent.setisplay(true);
            }} alt="" />
          </div>
        </div>
      <div className="songdetails">
          <span>{props.artist.songtype}</span>
      </div>
    </div>
  </div>
  )
}

export default Songtype
