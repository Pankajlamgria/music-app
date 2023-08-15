import React, { useState, useRef, useEffect } from "react";
import "../css/musicplayer.css";
import musiccontext from "../context/Musincontext";
import { useContext } from "react";
import play from "../img/playtriangle.png";
import pause from "../img/pause.png";
import next from "../img/next.png";
import volumeimg from "../img/volume.png";
import previous from "../img/previous.png";
const Musicplayer = () => {
  const contextcontent = useContext(musiccontext);
  const [isplay, setisplay] = useState(false);

  const audioelem = useRef();
  const clickRef = useRef();

  const checkWidth = async (e) => {
    contextcontent.setcurrentsong({
      ...contextcontent.currentsong,
      length: audioelem.current.duration,
    });
    let width = clickRef.current.clientWidth;
    const offset = e.nativeEvent.offsetX;
    const divprogress = (offset / width) * 100;
    audioelem.current.currentTime =
      (divprogress / 100) * audioelem.current.duration;
    audioelem.current.play();
    setisplay(true);
  };
  const onPlaying = () => {
    const duration = audioelem.current.duration;
    const ct = audioelem.current.currentTime;
    // console.log(ct);
    contextcontent.setcurrentsong({
      ...contextcontent.currentsong,
      progress: (ct / duration) * 100,
      length: duration,
      ct: ct,
    });
  };
  const handleend = () => {
    audioelem.current.pause();
    setisplay(false);
    contextcontent.setcurrentsong({
      ...contextcontent.currentsong,
      progress: 0,
      ct: 0,
    });
  };
  const handlnoconnection = () => {
    alert("Please check your connection.");
  };
  const handleplaypause = () => {
    // console.log(audioelem.current.duration);
    if (isplay) {
      audioelem.current.pause();
      setisplay(false);
    } else {
      audioelem.current.play();
      setisplay(true);
    }
  };

  const handlevolume=(e)=>{
    audioelem.current.volume=e.target.value/100;
  }
  const handlenextsong=()=>{
    let index=localStorage.getItem("index");
    index+=1;
    console.log(contextcontent.songlist);
    if(index===contextcontent.songlist.length){
      index=0;
    }
    else{
      contextcontent.setcurrentsong(contextcontent.songlist[index]);
    }
    localStorage.setItem("index",index);
  }
  const handleprevioussong=()=>{

  }

  return (
    <div>
      <div className="musicplayer">
        <div className="musicdetailssec">
          <div className="currentimgcover">
            <img src={`${contextcontent.currentsong.imgurl}`} alt="songimg" />
          </div>
          <div className="currentsongdetial">
            <h5 className="songtitle">{contextcontent.currentsong.songname}</h5>
            <span className="songartistname">
              {contextcontent.currentsong.artistname}
            </span>
          </div>
        </div>
        <div className="songoperations">
          <div className="musicplayercontainer">
            <div className="controls">
              <div className="changetrack">
                <img src={previous} onClick={handleprevioussong} alt="" />
              </div>
              <div className="playpause" onClick={handleplaypause}>
                <img
                  src={play}
                  id="playicon"
                  style={{ display: isplay ? "none" : "flex" }}
                  alt=""
                />
                <img
                  src={pause}
                  id="pauseicon"
                  style={{ display: isplay ? "flex" : "none" }}
                  alt=""
                />
              </div>
              <div className="changetrack">
                <img src={next} onClick={handlenextsong} alt="" />
              </div>
            </div>
            <div className="navigation">
              <div className="currenttime">
                {Math.floor(contextcontent.currentsong.ct / 60)} :{" "}
                {Math.ceil(contextcontent.currentsong.ct % 60)}
              </div>
              <div
                className="navigation_back"
                onClick={checkWidth}
                ref={clickRef}
              >
                {
                  <audio
                    src={`${contextcontent.currentsong.songurl}`}
                    ref={audioelem}
                    onTimeUpdate={onPlaying}
                    onEnded={handleend}
                    onStalled={handlnoconnection}
                    volume
                  ></audio>
                }

                <div
                  className="seek_bar"
                  style={{
                    width: `${contextcontent.currentsong.progress + "%"}`,
                  }}
                ></div>
              </div>
              <div className="endtime">
                {Math.floor(contextcontent.currentsong.length / 60)} :{" "}
                {Math.ceil(contextcontent.currentsong.length % 60)}0
              </div>
            </div>
          </div>
          <div className="volumecontroler">
            <div className="sondicon"><img src={volumeimg} alt="" /></div>
            <input
              id="sondvolcont"
              type="range"
              onChange={handlevolume}
              defaultValue="50"
              className="mx-2  volumecontrolknob "
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Musicplayer;
