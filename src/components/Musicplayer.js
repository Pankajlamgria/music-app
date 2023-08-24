import React, { useState, useRef, useEffect } from "react";
import "../css/musicplayer.css";
import musiccontext from "../context/Musincontext";
import { useContext } from "react";
import play from "../img/playtriangle.png";
import pause from "../img/pause.png";
import next from "../img/next.png";
import Loading from "../img/darkloading.png";
import volumeimg from "../img/volume.png";
import previous from "../img/previous.png";
const Musicplayer = () => {
  const contextcontent = useContext(musiccontext);
  // const [isplay, setisplay] = useState(false);
  // const audioelem = useRef();
  // const clickRef = useRef();

  // const checkWidth = async (e) => {
  //   contextcontent.setcurrentsong({
  //     ...contextcontent.currentsong,
  //     length: audioelem.current.duration,
  //   });
  //   let width = clickRef.current.clientWidth;
  //   const offset = e.nativeEvent.offsetX;
  //   const divprogress = (offset / width) * 100;
  //   audioelem.current.currentTime =
  //     (divprogress / 100) * audioelem.current.duration;
  //   audioelem.current.play();
  //   setisplay(true);
  // };
  // const onPlaying = () => {
  //   const duration = audioelem.current.duration;
  //   const ct = audioelem.current.currentTime;
  //   contextcontent.setcurrentsong({
  //     ...contextcontent.currentsong,
  //     progress: (ct / duration) * 100,
  //     length: duration,
  //     ct: ct,
  //   });
  // };
  // const handleend =async () => {
  //   const ans=contextcontent.audioelem.current.pause();
  //   contextcontent.setisplay(false);
  //   if (ans !== undefined) {
  //     ans.then(_ => {
  //       // Automatic playback started!
  //       // Show playing UI.
  //     })
  //     .catch(error => {
  //       // Auto-play was prevented
  //       // Show paused UI.
  //     });
  //   }
  //   contextcontent.handlenextsong();
  //   // let index=localStorage.getItem("index");
  //   // index\
  //   // contextcontent.setcurrentsong({
  //   //   ...contextcontent.currentsong,
  //   //   progress: 0,
  //   //   ct: 0,
  //   // });
  // };
  // const handlnoconnection = () => {
  //   alert("Please check your connection.");
  // };
  // const handleplaypause = () => {
  //   if (isplay) {
  //     audioelem.current.pause();
  //     setisplay(false);
  //   } else {
  //     audioelem.current.play();
  //     setisplay(true);
  //   }
  // };

  // const handlevolume=(e)=>{
  //   audioelem.current.volume=e.target.value/100;
  // }
  // const handlenextsong=()=>{
  //   let index=localStorage.getItem("index");
  //   index=Number(index);
  //   index+=1;
  //   console.log(contextcontent.songlist);
  //   if(contextcontent.songlist.length===0){
  //     index=0;
  //   }
  //   else{
  //     if(index===contextcontent.songlist.length){
  //       index=0;
  //       contextcontent.setcurrentsong(contextcontent.songlist[index]);
  //       localStorage.setItem("index",index);
  //     }
  //   }
  //   audioelem.current.play();
  //   setisplay(true);
  //   audioelem.current.currentTime=0;

  // }
  // const handleprevioussong=()=>{

  // }
  // const [first,setfirst]=useState(1);
  function runfunc() {
    console.log("loaded running");
    contextcontent.setmusicplayerloading(false);
    if (contextcontent.first === 1) {
      contextcontent.setfirst(2);
    } else {
      contextcontent.audioelem.current.play();
    }
  }
  // const canplayEvent = () => {
  //   contextcontent.audioelem.current.play()
  //   contextcontent.audioelem.current.currentTime=0;
  // }
  return (
    // <div className="h2"></div>
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
                <img
                  src={previous}
                  onClick={contextcontent.handleprevioussong}
                  alt=""
                />
              </div>
              <div
                className="playpause"
                onClick={contextcontent.handleplaypause}
              >
                {/* Loading */}
                <div className="firstcontainer" style={{display:(contextcontent.musicplayerloading)?"block":"none"}}>
                  <img src={Loading} id="darkloading"  alt="" />
                </div>
                <div className="secondcontiner" style={{display:(contextcontent.musicplayerloading)?"none":"block"}}>
                  <img
                    src={play}
                    id="playicon"
                    style={{ display: contextcontent.isplay ? "none" : "flex" }}
                    alt=""
                  />
                  <img
                    src={pause}
                    id="pauseicon"
                    style={{ display: contextcontent.isplay ? "flex" : "none" }}
                    alt=""
                  />
                </div>
              </div>
              <div className="changetrack">
                <img
                  src={next}
                  onClick={contextcontent.handlenextsong}
                  alt=""
                />
              </div>
            </div>
            {
              <audio
                src={`${contextcontent.currentsong.songurl}`}
                ref={contextcontent.audioelem}
                onTimeUpdate={contextcontent.onPlaying}
                onEnded={contextcontent.handleend}
                // onCanplay={canplayEvent}
                preload="auto"
                volume
                // onLoadedData={runfunc}
                onCanPlay={runfunc}
              ></audio>
            }
            <div className="navigation">
              <div className="currenttime">
                {Math.floor(contextcontent.currentsong.ct / 60)} :{" "}
                {Math.ceil(contextcontent.currentsong.ct % 60)}
              </div>
              <div
                className="navigation_back"
                onClick={contextcontent.checkWidth}
                ref={contextcontent.clickRef}
              >
                <div
                  className="seek_bar"
                  style={{
                    width: `${contextcontent.currentsong.progress + "%"}`,
                  }}
                ></div>
              </div>
              <div className="endtime">
                {Math.floor(contextcontent.currentsong.length / 60)} :{" "}
                {Math.ceil(contextcontent.currentsong.length % 60)}
              </div>
            </div>
          </div>
          <div className="volumecontroler">
            <div className="sondicon">
              <img src={volumeimg} alt="" />
            </div>
            <input
              id="sondvolcont"
              type="range"
              onChange={contextcontent.handlevolume}
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
