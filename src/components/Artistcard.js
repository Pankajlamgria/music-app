import React, { useContext, useState } from "react";
import "../css/card.css";
import Loading from "../img/loading.png";
import playimg from "../img/playtriangle.png";
import musiccontext from "../context/Musincontext";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
const Artistcard = (props) => {
  const [loading, setloading] = useState(true);
  const history = useHistory();
  const contextcontent = useContext(musiccontext);
  const handlesetsonglist = async () => {
    await contextcontent.getartistsong(props.artist.artistname);
    localStorage.setItem("album", "artist");
    localStorage.setItem("albumtype", props.artist.artistname);
    localStorage.setItem("index", 0);
  };

  return (
    <div>
      <div className="card" >
        <div className="songimg">
          <img
            style={{ display: loading ? "block" : "none" }}
            src={Loading}
            id="imgloading"
            alt="loading"
          />
          <img
            style={{ display: loading ? "none" : "block" }}
            onLoad={() => {
              setloading(false);
            }}
            id="musicimg"
            src={`${props.artist.imgurl}`}
            alt=""
          />
          <div className="playlogo">
            <img
              src={playimg}
              onClick={() => {
                contextcontent.setmusicplayerloading(true);
                // console.log("song play");
                handlesetsonglist();
                contextcontent.audioelem.current.load();  
                // contextcontent.audioelem.current.play();
                contextcontent.audioelem.current.currentTime = 0;
                contextcontent.setisplay(true);
              }}
              alt=""
            />
          </div>
        </div>
        <div className="songdetails">
          <span
            onClick={async () => {
              contextcontent.settempsongdetail({
                album: "artist",
                albumtype: props.artist.artistname,
              });
              await contextcontent.getartistonlysongs(props.artist.artistname);
              history.push("/songs");
              console.log("show songs");
            }}
          >
            Artist - {props.artist.artistname}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Artistcard;
