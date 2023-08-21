import React, { useContext, useState } from "react";
import "../css/card.css";
import playimg from "../img/playtriangle.png";
import Loading from "../img/loading.png";
import musiccontext from "../context/Musincontext";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
const Songtype = (props) => {
  const [loading, setloading] = useState(true);
  const history = useHistory();
  const contextcontent = useContext(musiccontext);
  const handlesetsonglist = async () => {
    await contextcontent.getsongtypesong(props.artist.songtype);
    localStorage.setItem("album", "songtype");
    localStorage.setItem("albumtype", props.artist.songtype);
    localStorage.setItem("index", 0);
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
          <img
            id="musicimg"
            style={{ display: loading ? "none" : "block" }}
            src={`${props.artist.imgurl}`}
            onLoad={() => {
              setloading(false);
            }}
            alt=""
          />
          <div className="playlogo">
            <img
              src={playimg}
              onClick={() => {
                handlesetsonglist();
                contextcontent.setmusicplayerloading(true);
                contextcontent.audioelem.current.load();
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
                album: "songtype",
                albumtype: props.artist.songtype,
              });
              await contextcontent.getsongtypeonlysongs(props.artist.songtype);
              history.push("/songs");
              console.log("show songs");
            }}
          >
            {props.artist.songtype}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Songtype;
