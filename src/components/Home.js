import React from "react";
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
const Home = () => {
  const contextcontent = useContext(musiccontext);
  useEffect(() => {
    contextcontent.gethomedat();
  }, []);
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
              <div className="loginsec">
                <img src={userimg} alt="" />
              </div>
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
