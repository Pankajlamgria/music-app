// {require("dotenv").config();}
import React from "react";
import musiccontext from "./Musincontext.js";
import { useState, useRef } from "react";
// import history from 'history';
const Musicstate = (props) => {
  // const history=useHistory();
  const host = "http://localhost:4000";
  const [musicplayerloading, setmusicplayerloading] = useState(false);
  
  const [songfolder, setsongfolder] = useState([]);
  const [allartist, setallartist] = useState([]);
  const [language, setlanguage] = useState([]);
  const [songtype, setsongtype] = useState([]);
  const [editsongid, seteditsongid] = useState();
  const [recent, setrecent] = useState([]);
  const [songlist, setsonglist] = useState([]);
  const [tempsonglist, settempsonglist] = useState([]);
  const [tempsongdetail, settempsongdetail] = useState({album:"",albumname:""});
  const [searchlist, setsearchlist] = useState([]);
  const [userdetial, setuserdetail] = useState({});
  const [favsong, setfavsong] = useState([]);
  
  const [first, setfirst] = useState(1);

  const [currentsong, setcurrentsong] = useState([]);

  const addsong=async(imgurl,songurl,songname,artistname,songtype,language)=>{
    const responce=await fetch(`${host}/api/song/addsong`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "authtoken":localStorage.getItem("musictoken"),
      },
      body:JSON.stringify({songname:songname,artistname:artistname,imgurl:imgurl,songurl:songurl,language:language,songtype:songtype})
    });
    const addsongresult=await responce.json();
    if(addsongresult.success){
      alert("Successfully added song");
    }
    else{
      alert(addsongresult.error);
    }
  }

  // Edit song
  const editsong=async(id,artistname,language,songtype)=>{
    const responce=await fetch(`${host}/api/song/edit/${id}`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "authtoken":localStorage.getItem("musictoken"),
      },
      body:JSON.stringify({artistname:artistname,language:language,songtype:songtype})
    })
    const editsongresponse=await responce.json();
    if(editsongresponse.success){
      alert("updated successfully");
    }
    else{
      alert(editsongresponse.error);
    }
  }
  // deletesong
  const deletesong=async(id)=>{
    const responce=await fetch(`${host}/api/song/deletesong/${id}`,{
      method:"DELETE",
      headers:{
        "Content-Type":"application/json",
        "authtoken":localStorage.getItem("musictoken"),
      }
    })
  }

  // GET FAVOURATE SONG
  const getfavouratesong=async()=>{
    const responce=await fetch(`${host}/api/liked/showall`,{
      method:"GET",
      headers:{
        "Content-Type":"application/json",
        "authtoken":localStorage.getItem("musictoken"),
      }
    })
    const favourate=await responce.json();
    if(favourate.success){
      setfavsong(favourate.allsong);
    }
    else{
      alert("Something went wrong");
    }
  }

  // set FAVOURATE SONG
  const setfavouratesong=async(id)=>{
    const responce=await fetch(`${host}/api/liked/addlikedsong/${id}`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "authtoken":localStorage.getItem("musictoken"),
      }
    })
    const favourate=await responce.json();
    if(!favourate.success){
      alert("Something went wrong.");
    }
  }
  // deletefav song
  const deletefavouratesong=async(id)=>{
    const responce=await fetch(`${host}/api/liked/deletesong/${id}`,{
      method:"DELETE",
      headers:{
        "Content-Type":"application/json",
        "authtoken":localStorage.getItem("musictoken"),
      }
    })
    const favourate=await responce.json();
    if(!favourate.success){
      alert("Something went wrong.");
    }
  }


  const playsong=async(id)=>{
    const responce=await fetch(`${host}/api/song//findsong/${id}`,{
    method:"GET",
    headers:{
      "Content-Type":"application/json"
    },
    });
    const searchedsongresult=await responce.json();
    setmusicplayerloading(true);
    setcurrentsong(searchedsongresult.songdata);
    setsonglist(searchedsongresult.songdata);
  }
  const search = async (val) => {
    const response = await fetch(`${host}/api/song/search/${val}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const searchresult = await response.json();
    if (searchresult.success) {
      setsearchlist(searchresult.arraydata);
    }
    else{
      setsearchlist([]);
      alert("No result found.");
    }
  };

  const gethomedat = async () => {
    const response = await fetch(`${host}/api/song/homepage`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // authtoken: localStorage.getItem("musictoken"),
      },
    });
    const homedataresult = await response.json();
    if (homedataresult.success) {
      setallartist(homedataresult.allartist);
      setlanguage(homedataresult.alllanguage);
      setsongtype(homedataresult.allsongtype);
    }
  };
  const getrecentsongs = async () => {
    const response = await fetch(`${host}/api/song/recentsongs`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authtoken: localStorage.getItem("musictoken"),
      },
    });
    const recentsongsresult = await response.json();
    if (recentsongsresult.success) {
      setrecent(recentsongsresult.recentsongs);
    }
  };

  const getartistsong = async (artistname, index = 0) => {
    const response = await fetch(
      `${host}/api/song/homepage/artist/${artistname}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const artistresult = await response.json();
    if (artistresult.success) {
      setsonglist(artistresult.filteredsongs);
      setcurrentsong(artistresult.filteredsongs[index]);
    } else {
      alert(artistresult.error);
    }
  };

  const getartistonlysongs = async (artistname) => {
    const response = await fetch(
      `${host}/api/song/homepage/artist/${artistname}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const artistresult = await response.json();
    if (artistresult.success) {
      settempsonglist(artistresult.filteredsongs);
    } else {
      alert(artistresult.error);
    }
  };
  const getlanguageonlysongs = async (language) => {
    const response = await fetch(
      `${host}/api/song/homepage/language/${language}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const languageresult = await response.json();
    if (languageresult.success) {
      settempsonglist(languageresult.filteredsongs);
    } else {
      alert(languageresult.error);
    }
  };
  

  const getlanguagesong = async (language, index = 0) => {
    const response = await fetch(
      `${host}/api/song/homepage/language/${language}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const languageresult = await response.json();
    if (languageresult.success) {
      setsonglist(languageresult.filteredsongs);
      // if(localStorage.getItem("musictoken")){
      //   addrecentsong(languageresult.filteredsongs[index]._id);
      // }
      setcurrentsong(languageresult.filteredsongs[index]);
    } else {
      alert(languageresult.error);
    }
  };
  const getsongtypesong = async (songtype, index = 0) => {
    const response = await fetch(
      `${host}/api/song/homepage/songtype/${songtype}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const songtyperesult = await response.json();
    if (songtyperesult.success) {
      setsonglist(songtyperesult.filteredsongs);
      // if(localStorage.getItem("musictoken")){
      //   addrecentsong(songtyperesult.filteredsongs[index]._id);

      // }
      setcurrentsong(songtyperesult.filteredsongs[index]);
    } else {
      alert(songtyperesult.error);
    }
  };
  const getsongtypeonlysongs = async (songtype) => {
    const response = await fetch(
      `${host}/api/song/homepage/songtype/${songtype}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const songtyperesult = await response.json();
    if (songtyperesult.success) {
      settempsonglist(songtyperesult.filteredsongs);
    } else {
      alert(songtyperesult.error);
    }
  };

  const addrecentsong = async (id) => {
    const response = await fetch(`${host}/api/song/addrecentlyplayed/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authtoken: localStorage.getItem("musictoken"),
      },
    });
    const addrecentsong = await response.json();
    if (addrecentsong.success) {
      console.log("addedsuccesfful");
      getrecentsongs();
    } else {
      // alert(addrecentsong.error);
    }
  };
  const getuserdetail = async () => {
    const response = await fetch(`${host}/api/auth/userdetail`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authtoken: localStorage.getItem("musictoken"),
      },
    });
    const userdetialresult = await response.json();
    if (userdetialresult.success) {
      setuserdetail(userdetialresult.user);
    } else {
      alert("login first");
    }
  };

  // musicplayer
  // const audioelem = useRef();

  // const contextcontent = useContext(musiccontext);
  const [isplay, setisplay] = useState(false);
  const audioelem = useRef();
  const clickRef = useRef();

  const checkWidth = async (e) => {
    setcurrentsong({
      ...currentsong,
      length: audioelem.current.duration,
    });
    let width = clickRef.current.clientWidth;
    const offset = e.nativeEvent.offsetX;
    const divprogress = (offset / width) * 100;
    audioelem.current.currentTime =
      (divprogress / 100) * audioelem.current.duration;
    audioelem.current.play();
    setisplay(true);
  };
  const onPlaying = () => {
    const duration = audioelem.current.duration;
    const ct = audioelem.current.currentTime;
    setcurrentsong({
      ...currentsong,
      progress: (ct / duration) * 100,
      length: duration,
      ct: ct,
    });
  };
  const handleend = async () => {
    setmusicplayerloading(true);
    console.log("runned");
    let index = localStorage.getItem("index");
    index = Number(index);
    index += 1;
    if (songlist.length === 0) {
      index = 0;
    } else {
      if (index === songlist.length) {
        index = 0;
      }
      if (localStorage.getItem("musictoken")) {
        addrecentsong(songlist[index]._id);
      }
      setcurrentsong(songlist[index]);
      localStorage.setItem("index", index);
      // await audioelem.current.load();
    }
    audioelem.current.currentTime = 0;
    // await audioelem.current.play();
    setisplay(true);
  };

  const handlnoconnection = () => {
    alert("Please check your connection.");
  };

  const handleplaypause = () => {
    if (isplay) {
      audioelem.current.pause();
      setisplay(false);
    } else {
      setmusicplayerloading(true);
      audioelem.current.play();
      setmusicplayerloading(false);
      setisplay(true);
      // audioelem.current.load();
    }
  };

  const handlevolume = (e) => {
    audioelem.current.volume = e.target.value / 100;
  };
  const handlenextsong = async () => {
    setmusicplayerloading(true);
    let index = localStorage.getItem("index");
    index = Number(index);
    index += 1;
    if (songlist.length === 0) {
      index = 0;
    } else {
      if (index === songlist.length) {
        index = 0;
      }
      if (localStorage.getItem("musictoken")) {
        addrecentsong(songlist[index]._id);
      }
      setcurrentsong(songlist[index]);
      localStorage.setItem("index", index);
      // await audioelem.current.load();
    }
    audioelem.current.currentTime = 0;
    // await audioelem.current.play();
    setisplay(true);
  };
  const handleprevioussong = async () => {
    setmusicplayerloading(true);
    let index = localStorage.getItem("index");
    index = Number(index);
    index -= 1;
    if (songlist.length === 0) {
      index = 0;
    } else {
      if (index === -1) {
        index = songlist.length - 1;
      }
      if (localStorage.getItem("musictoken")) {
        addrecentsong(songlist[index]._id);
      }
      setcurrentsong(songlist[index]);
      localStorage.setItem("index", index);
    }
    // await audioelem.current.load();
    // await audioelem.current.play();
    setisplay(true);
    audioelem.current.currentTime = 0;
  };
  const fetchlikedsong=async(index)=>{
    const responce=await fetch(`${host}/api/liked/showall`,{
        method:"GET",
        headers:{
          "Content-Type":"application/json",
          "authtoken":localStorage.getItem("musictoken"),
        }
      })
      const favourate=await responce.json();
      if(favourate.success){
        setsonglist(favourate.allsong);
        setcurrentsong(favourate.allsong[index]);
      }
      else{
        alert("Something went wrong");
      }
  }

  return (
    <musiccontext.Provider
      value={{
        songfolder,setsongfolder,
        fetchlikedsong,
        favsong,
        deletefavouratesong,
        setfavouratesong,
        getfavouratesong,
        addsong,
        deletesong,
        musicplayerloading,
        setmusicplayerloading,
        getlanguageonlysongs,
        getsongtypeonlysongs,
        tempsonglist,
        settempsonglist,
        tempsongdetail,
        settempsongdetail,
        getartistonlysongs,
        search,
        playsong,
        searchlist,
        getrecentsongs,
        gethomedat,
        allartist,
        language,
        songtype,
        recent,
        currentsong,
        setcurrentsong,
        songlist,
        setsonglist,
        getartistsong,
        getlanguagesong,
        getsongtypesong,
        getuserdetail,
        userdetial,
        handleplaypause,
        handleprevioussong,
        handlenextsong,
        handlnoconnection,
        handleend,
        checkWidth,
        handlevolume,
        onPlaying,
        audioelem,
        clickRef,
        isplay,
        setisplay,
        first,
        setfirst,
        editsong,
        editsongid,
        seteditsongid
      }}
    >
      {props.children}
    </musiccontext.Provider>
  );
};

export default Musicstate;
