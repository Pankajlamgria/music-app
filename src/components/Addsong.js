import React, { useContext } from "react";
import Loading from "../img/loading.png";
import { useState } from "react";
import { storage } from "./firebase";
import musiccontext from "../context/Musincontext";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "../css/addsong.css";
const Addsong = () => {
  const contextcontent = useContext(musiccontext);
  const [songupload, setsongupload] = useState("");
  const [imgupload, setimgupload] = useState("");
  const [loading, setloading] = useState(false);
  const [songurl, setsongurl] = useState("");
  const [imgurl, setimgurl] = useState("");
  const [songdetail, setsongdetial] = useState({
    songname: "",
    artistname: "",
    language: "",
    songtype: "",
  });
  function titleCase(string) {
    return string[0].toUpperCase() + string.slice(1).toLowerCase();
  }
  const handledetailchange = async (e) => {
    setsongdetial({ ...songdetail, [e.target.name]: e.target.value });
  };
  const handlesongchange = (e) => {
    setsongupload(e.target.files[0]);
  };
  const handleimgchange = (e) => {
    setimgupload(e.target.files[0]);
  };
  const handleupload = async (e) => {
    e.preventDefault();
    if (songdetail.artistname === ""||songdetail.songname === ""||songdetail.language === ""||songdetail.songtype === ""||imgupload === ""||songupload=== "") {
      alert("Please enter Correct details of song.");
    } else {
      setloading(true);
      console.log(songdetail);
      const fileref = ref(storage, `songs/${titleCase(songdetail.songname)}/song`);
      const imgref = ref(storage, `songs/${titleCase(songdetail.songname)}/img`);
      uploadBytes(imgref, imgupload).then((snapshot) => {
        getDownloadURL(imgref).then((iurl) => {
          uploadBytes(fileref, songupload).then((snapshot) => {
            getDownloadURL(fileref).then((url) => {
              console.log(iurl);
              setsongurl(url);
              contextcontent.addsong(
                iurl,
                url,
                titleCase(songdetail.songname),
                titleCase(songdetail.artistname),
                titleCase(songdetail.songtype),
                titleCase(songdetail.language)
              );
              setloading(false);
            });
          });
        });
      });
    }
  };
  return (
    <div className="addsongcontainer">
      <div
        className="loadingcover"
        style={{ display: loading ? "block" : "none" }}
      >
        <img src={Loading} id="loadingimg" alt="loading.." />
      </div>
      <div
        className="productformcover"
        style={{ display: loading ? "none" : "block" }}
      >
        <h2>Add Song</h2>
        <form action="">
          <div className="fileentry">
            <label htmlFor="albumimg">Upload image</label>
            <input type="file" name="albumimg" onChange={handleimgchange} />
          </div>
          <div className="fileentry">
            <label htmlFor="albumsong">Upload song</label>
            <input type="file" name="albumsong" onChange={handlesongchange} />
          </div>
          <div className="entry">
            <label htmlFor="songname">Songname</label>
            <input type="text" name="songname" onChange={handledetailchange} />
          </div>
          <div className="entry">
            <label htmlFor="artistname">Artistname</label>
            <input
              type="text"
              name="artistname"
              onChange={handledetailchange}
            />
          </div>
          <div className="entry">
            <label htmlFor="language">Language</label>
            <input type="text" name="language" onChange={handledetailchange} />
          </div>
          <div className="entry">
            <label htmlFor="songtype">Songtype</label>
            <input type="text" name="songtype" onChange={handledetailchange} />
          </div>
          <button id="uploadbtn" onClick={handleupload}>
            Upload
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addsong;
