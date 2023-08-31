import React from "react";
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
  function runfunc() {
    console.log("loaded running");
    contextcontent.setmusicplayerloading(false);
    if (contextcontent.first === 1) {
      contextcontent.setfirst(2);
    } else {
      contextcontent.audioelem.current.play();
    }
  }

  return (
    <div>
      <div className="musicplayer" >
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
                volume="true"
                onLoadedData={runfunc}
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
