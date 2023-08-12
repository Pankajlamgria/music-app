import React from "react";
import "../css/home.css";
import userimg from "../img/user.png";
import musicicon from "../img/spotifyicon.png";
import addvertismentimg from "../img/addimg.jpg";
const Home = () => {
  return (
    <div>
      <div className="homecontent">
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
              <div className="addimgsec"><img src={addvertismentimg} alt="img" /></div>
              <div className="addtextsec">
                <p>PLAYLIST</p>
                <div className="loficover">
                <h2>LOFI BEATS <img className="musicicon" src={musicicon} alt="" /></h2>
                </div>
                <p>Listen to something soft!</p>
                  <button id="playbtn">Play</button>
                
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
