import React from "react";
import "../css/card.css";
import playimg from "../img/playtriangle.png";
import Loading from "../img/loading.png";
import musiccontext from "../context/Musincontext";
import { useContext, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
const Languagecard = (props) => {
  const [loading, setloading] = useState(true);
  const history = useHistory();
  const contextcontent = useContext(musiccontext);
  const handlesonglist = async () => {
    await contextcontent.getlanguagesong(props.artist.language);
    localStorage.setItem("album", "language");
    localStorage.setItem("albumtype", props.artist.language);
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
            onLoad={() => {
              setloading(false);
            }}
            src={`${props.artist.imgurl}`}
            alt=""
          />
          <div className="playlogo">
            <img
              src={playimg}
              alt=""
              onClick={async () => {
                handlesonglist();
                contextcontent.setmusicplayerloading(true);
                contextcontent.audioelem.current.play();
                contextcontent.audioelem.current.currentTime = 0;
                contextcontent.setisplay(true);
              }}
            />
          </div>
        </div>
        <div className="songdetails">
          <span
            onClick={async () => {
              contextcontent.settempsongdetail({
                album: "language",
                albumtype: props.artist.language,
              });
              await contextcontent.getlanguageonlysongs(props.artist.language);
              history.push("/songs");
              console.log("show songs");
            }}
          >
            {props.artist.language}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Languagecard;
