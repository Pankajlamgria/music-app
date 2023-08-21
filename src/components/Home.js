import React, { useState } from "react";
import "../css/home.css";
import userimg from "../img/user.png";
import musicicon from "../img/spotifyicon.png";
import addvertismentimg from "../img/addimg.jpg";
import musiccontext from "../context/Musincontext";
import { useEffect } from "react";
import { useContext } from "react";
import Artistcard from "./Artistcard";
import Languagecard from "./Languagecard";
import Songtype from "./Songtype.js";
import Recent from "./Recent";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const Home = () => {
  const contextcontent = useContext(musiccontext);
  const [user, setuser] = useState(false);
  const history = useHistory();
  useEffect(() => {
    if (localStorage.getItem("musictoken")) {
      contextcontent.getuserdetail();
      contextcontent.getrecentsongs();
    }
    // contextcontent.setfirst(1);
    // contextcontent.setisplay(false);
    contextcontent.gethomedat();
    const album = localStorage.getItem("album");
    let i = localStorage.getItem("index");
    i = Number(i);
    const albumtype = localStorage.getItem("albumtype");

    if (album === "songtype") {
      contextcontent.getsongtypesong(albumtype, i);
    } else if (album === "artist") {
      contextcontent.getartistsong(albumtype, i);
    } else if (album === "language") {
      contextcontent.getlanguagesong(albumtype, i);
    } else if (album === "searchedsong") {
      if (contextcontent.currentsong.length === 0) {
        contextcontent.playsong(albumtype);
      }
    } else {
      contextcontent.getartistsong("Arijit");
    }
  }, []);
  const handleshowuser = () => {
    if (user) {
      setuser(false);
    } else {
      setuser(true);
    }
    // (user)?(setuser(false); contextcontent.getuserdetail()):(setuser(true));
  };
  return (
    <div>
      <div className="homecontent">
        <div
          style={{
            background: "linear-gradient(to bottom,rgb(44 69 46),#161616)",
          }}
        >
          <div className="header">
            <h2 className="spotifyname">Spotify</h2>
            <div className="headercontent">
              <div className="btt">
                <button>Explore Premium</button>
              </div>
              <div
                className="loginsec"
                style={{
                  display: localStorage.getItem("musictoken") ? "flex" : "none",
                }}
              >
                <img src={userimg} alt="" onClick={handleshowuser} />
              </div>
              <div
                className="signinbtncover"
                style={{
                  display: localStorage.getItem("musictoken") ? "none" : "flex",
                }}
              >
                <button
                  id="signinbtn"
                  onClick={() => {
                    history.push("/signin");
                  }}
                >
                  Signin
                </button>
              </div>
            </div>
          </div>
          <div
            className="userblock"
            style={{ display: user ? "block" : "none" }}
          >
            <div className="userdetails">
              <p>{contextcontent.userdetial.name}</p>
              <p>{contextcontent.userdetial.email}</p>
              <p
                onClick={()=>{
                  history.push("/addsong");
                }}
                style={{
                  display:
                    contextcontent.userdetial.email ===
                    "pankajlamgria@gmail.com"
                      ? "block"
                      : "none",
                }}
              >
                Add Song
              </p>
              <p id="hrtop">Profile</p>
              <hr />
              <p
                id="hrbottom"
                onClick={() => {
                  localStorage.removeItem("musictoken");
                  window.location.reload(false);
                }}
              >
                Log out
              </p>
            </div>
          </div>
          <div className="addvertisment">
            <div className="addvertismentcard">
              <div className="addimgsec">
                <img src={addvertismentimg} alt="img" />
              </div>
              <div className="addtextsec">
                <p>PLAYLIST</p>
                <div className="loficover">
                  <h2>
                    LOFI BEATS{" "}
                    <img className="musicicon" src={musicicon} alt="" />
                  </h2>
                </div>
                <p>Listen to something soft!</p>
                <button id="playbtn">Play</button>
              </div>
            </div>
          </div>
        </div>
        <div className="musicsecheadingcover">
          <h2 className="musicsecheading">All Artist</h2>
          <p>Show all</p>
        </div>
        <div className="artistsec">
          {contextcontent.allartist.map((artist) => {
            return <Artistcard key={artist._id} artist={artist}></Artistcard>;
          })}
        </div>
        <div className="musicsecheadingcover">
          <h2 className="musicsecheading">All Language</h2>
          <p>Show all</p>
        </div>
        <div className="artistsec">
          {contextcontent.language.map((language) => {
            return (
              <Languagecard key={language._id} artist={language}></Languagecard>
            );
          })}
        </div>
        <div className="musicsecheadingcover">
          <h2 className="musicsecheading">Spotify's Playlist</h2>
          <p>Show all</p>
        </div>
        <div className="artistsec">
          {contextcontent.songtype.map((songtype) => {
            return <Songtype key={songtype._id} artist={songtype}></Songtype>;
          })}
        </div>

        <div
          className="recentlycover"
          style={{
            display: contextcontent.recent.length === 0 ? "none" : "block",
          }}
        >
          <div className="musicsecheadingcover">
            <h2 className="musicsecheading">Recently played</h2>
            <p>Show all</p>
          </div>
          <div className="artistsec">
            {contextcontent.recent.map((song) => {
              return <Recent key={song._id} artist={song}></Recent>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
