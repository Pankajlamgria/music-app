import React, { useContext } from "react";
import activeheart from "../img/activeheart.png";
import trash from "../img/delete.png";
import edit from "../img/edit.png";
import inactiveheart from "../img/inactiveheart.png";
import { useState } from "react";
import musiccontext from "../context/Musincontext";
import { storage } from "./firebase";
import { deleteObject, ref } from "firebase/storage";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const Songfoldersongs = (props) => {
  const history=useHistory();
  const contextcontent = useContext(musiccontext);
  const [flag, setflag] = useState(true);
  const handletoggleheart = () => {
    if(!localStorage.getItem("musictoken")){
      history.push("/signin");
    }
    else{
      if(flag){
        contextcontent.setfavouratesong(props.song._id);
        setflag(false);
      }
      else{
        contextcontent.deletefavouratesong(props.song._id);
        setflag(true);
      }
    }
    
  };
  const handleplaysong = () => {
    let index = 0;

    contextcontent.setmusicplayerloading(true);
    for (; index < contextcontent.tempsonglist.length; index++) {
      console.log(index);
      console.log(contextcontent.tempsonglist[index]);
      if (contextcontent.tempsonglist[index].songname === props.song.songname) {
        localStorage.setItem("index", index);
        break;
      }
    }
    localStorage.setItem("album", contextcontent.tempsongdetail.album);
    localStorage.setItem("albumtype", contextcontent.tempsongdetail.albumtype);

    if (contextcontent.tempsongdetail.album === "songtype") {
      contextcontent.getsongtypesong(
        contextcontent.tempsongdetail.albumtype,
        index
      );
    } else if (contextcontent.tempsongdetail.album === "artist") {
      contextcontent.getartistsong(
        contextcontent.tempsongdetail.albumtype,
        index
      );
    } else if (contextcontent.tempsongdetail.album === "language") {
      contextcontent.getlanguagesong(
        contextcontent.tempsongdetail.albumtype,
        index
      );
    } else {
      alert("some error occured");
    }
    contextcontent.audioelem.current.load();
    contextcontent.audioelem.current.currentTime = 0;
    contextcontent.setisplay(true);

    // contextcontent.getartistsong(contextcontent.tempsongdetail.albumtype, index);
    //   contextcontent.playsong(props.song._id);
    //   localStorage.setItem("index",0);
    //   localStorage.setItem("album","searchedsong");
    //   localStorage.setItem("albumtype",`${props.song._id}`);
    //   contextcontent.setisplay(true);
    //   contextcontent.audioelem.current.currentTime = 0;
  };
  const handledeletesong=()=>{

    const deleteref = ref(storage,`songs/${props.song.songname}/img`);
    const deleteref2 = ref(storage,`songs/${props.song.songname}/song`);
    try{
      deleteObject(deleteref);
      deleteObject(deleteref2);
      localStorage.setItem("index",0);
      contextcontent.deletesong(props.song._id);
      document.getElementById(props.song._id).style.display="none";
    }
    catch(error){
      console.log(error);
    }
  }
  const handleeditsong=()=>{
    contextcontent.seteditsongid(props.song._id);
    history.push("/editsong");
  }
  return (
    <div>
      <div className="songcontainer" id={props.song._id}>
        <div className="songcontainerimg">
          <img src={`${props.song.imgurl}`} alt="" />
        </div>
        <div className="searchedsongdetials">
          <div className="songnamecover">
            <p id="searchsongname" onClick={handleplaysong}>
              {props.song.songname}
            </p>
            <span id="searchartistname">{props.song.artistname}</span>
          </div>
        </div>
        <div className="like">
          <div className="likeimgcontainer">
            <img
              onClick={handletoggleheart}
              style={{ display: flag ? "block" : "none" }}
              src={inactiveheart}
              alt="faviorate"
            />
            <img
              onClick={handletoggleheart}
              style={{ display: flag ? "none" : "block" }}
              src={activeheart}
              alt="faviorate"
            />
          </div>
        </div>
        <div className="time" >{props.song.time}</div>
        <div className="editdelbtn" style={{display:(contextcontent.userdetial.email==="pankajlamgria@gmail.com")?"flex":"none"}}>
          <div className="delete">
            <img src={trash} onClick={handledeletesong} alt="" />
          </div>
          <div className="edit">
            <img src={edit} onClick={handleeditsong} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Songfoldersongs;
