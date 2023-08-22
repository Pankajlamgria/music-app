import React from "react";
import { useContext } from "react";

import musiccontext from "../context/Musincontext";
import { useState } from "react";
import inactiveheart from "../img/inactiveheart.png";
import activeheart from "../img/activeheart.png";
const Favsong = (props) => {

  const [flag, setflag] = useState(true);
  const contextcontent = useContext(musiccontext);
  const handleplaysong = async() => {
    let index = 0;
    contextcontent.setmusicplayerloading(true);
    for (; index < contextcontent.favsong.length; index++) {
      console.log(index);
      console.log(contextcontent.favsong[index]);
      if (contextcontent.favsong[index].songname === props.song.songname) {
        localStorage.setItem("index", index);
        break;
      }
    }
    localStorage.setItem("album", "liked");
    localStorage.setItem("albumtype", "liked");
    await contextcontent.fetchlikedsong(index);
    contextcontent.audioelem.current.load();
    contextcontent.audioelem.current.currentTime = 0;
    contextcontent.setisplay(true);
  };
  const handletoggleheart = () => {
    if (flag) {
      contextcontent.deletefavouratesong(props.song.songid);
      let index=0;
      for ( ; index < contextcontent.songlist.length; index++) {

        if (contextcontent.songlist[index].songname === props.song.songname) {
          contextcontent.songlist.splice(index,1);
        }
      }
      let oldindex=localStorage.getItem("index");
      if(oldindex>=contextcontent.songlist.length){
        oldindex=contextcontent.songlist.length-1;
        localStorage.setItem("index",oldindex);
      }
      document.getElementById(props.song._id).style.display = "none";
      setflag(false);
    } else {
      contextcontent.setfavouratesong(props.song._id);
      setflag(true);
    }
  };
  return (
    <div>
      <div className="songcontainer" id={props.song._id}>
        <div className="songcontainerimg">
          <img src={`${props.song.imgurl}`} alt=""/>
        </div>
        <div className="searchedsongdetials">
          <div className="songnamecover">
            <p id="searchsongname" onClick={handleplaysong}>
              {props.song.songname}
            </p>
            <span id="searchartistname">{props.song.artistname}</span>
          </div>
        </div>
        <div className="like">
          <div className="likeimgcontainer">
            <img
              onClick={handletoggleheart}
              style={{ display: flag ? "block" : "none" }}
              src={activeheart}
              alt="faviorate"
            />
            <img
              onClick={handletoggleheart}
              src={inactiveheart}
              style={{ display: flag ? "none" : "block" }}
              alt="faviorate"
            />
          </div>
        </div>
        <div className="time">{props.song.time}</div>
      </div>
    </div>
  );
};

export default Favsong;
