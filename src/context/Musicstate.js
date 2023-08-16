// {require("dotenv").config();}
import React from "react";
import musiccontext from "./Musincontext.js";
import { useState,useRef } from "react";
const Musicstate = (props) => {
    const host="http://localhost:4000";
  const [allartist, setallartist] = useState([]);
  const [language, setlanguage] = useState([]);
  const [songtype, setsongtype] = useState([]);
  const [recent, setrecent] = useState([]);
  const [songlist, setsonglist] = useState([]);

  const [currentsong,setcurrentsong]=useState({
    _id: "64d8ee6b552894efeddd06bd",
      songname: "Song4",
      artistname: "Dj amish",
      imgurl: "https://firebasestorage.googleapis.com/v0/b/imageuploadingtester.appspot.com/o/songs%2Faustin-neill-hgO1wFPXl3I-unsplash.jpg?alt=media&token=07520d98-7507-4ace-84bb-bb4d396720ae",
      songurl: "https://firebasestorage.googleapis.com/v0/b/imageuploadingtester.appspot.com/o/songs%2FJab%20Yaar%20Kare%20Parwah%20Meri%20Mp3%20Song%20Download-(PagalZilla).mp3?alt=media&token=8d84b916-4eb6-4b53-a4d5-ddeff11dc415",
      language: "Hindi",
      songtype: "Jazz",
      ct:0,
      length:0,
      time: "2023-08-13T14:53:31.832Z",
  })
  
  
  const gethomedat=async()=>{
    const response=await fetch(`${host}/api/song/homepage`,{
        method:"GET",
        headers:{
            "Content-Type":"application/json",
            "authtoken":localStorage.getItem("musictoken")
        }
    });
    const homedataresult=await response.json();
    if(homedataresult.success){
        setallartist(homedataresult.allartist);
        setlanguage(homedataresult.alllanguage);
        setsongtype(homedataresult.allsongtype);
        setrecent(homedataresult.recentsongs);
    }
  }

  const getartistsong=async(artistname,index=0)=>{
    const response=await fetch(`${host}/api/song/homepage/artist/${artistname}`,{
        method:"GET",
        headers:{
            "Content-Type":"application/json",
        }
    });
    const artistresult=await response.json();
    if(artistresult.success){
          setsonglist(artistresult.filteredsongs);
          addrecentsong(artistresult.filteredsongs[index]._id);
          setcurrentsong(artistresult.filteredsongs[index]);
    }
    else{
      alert(artistresult.error);
    }
  }

  const getlanguagesong=async(language,index=0)=>{
    const response=await fetch(`${host}/api/song/homepage/language/${language}`,{
        method:"GET",
        headers:{
            "Content-Type":"application/json",
        }
    });
    const languageresult=await response.json();
    if(languageresult.success){
          setsonglist(languageresult.filteredsongs);
          addrecentsong(languageresult.filteredsongs[index]._id);
          setcurrentsong(languageresult.filteredsongs[index]);
    }
    else{
      alert(languageresult.error);
    }
  }
  const getsongtypesong=async(songtype,index=0)=>{
    const response=await fetch(`${host}/api/song/homepage/songtype/${songtype}`,{
        method:"GET",
        headers:{
            "Content-Type":"application/json",
        }
    });
    const songtyperesult=await response.json();
    if(songtyperesult.success){
          setsonglist(songtyperesult.filteredsongs);
          addrecentsong(songtyperesult.filteredsongs[index]._id);
          setcurrentsong(songtyperesult.filteredsongs[index]);
    }
    else{
      alert(songtyperesult.error);
    }
  }

  const addrecentsong=async(id)=>{
    const response=await fetch(`${host}/api/song/addrecentlyplayed/${id}`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "authtoken":localStorage.getItem("musictoken"),
        }
    });
    const addrecentsong=await response.json();
    if(addrecentsong.success){
      console.log("addedsuccesfful");
      // getrece
    }
    else{
      alert(addrecentsong.error);
    }
  }





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
  const handleend =async () => {
    console.log("runned");
    let index=localStorage.getItem("index");
    index=Number(index);
    index+=1;
    if(songlist.length===0){
      index=0;
    }
    else{
      if(index===songlist.length){
        index=0;
      }
      addrecentsong(songlist[index]._id);
      setcurrentsong(songlist[index]);
      localStorage.setItem("index",index);
      // await audioelem.current.load();
    }
    audioelem.current.currentTime=0;
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
      audioelem.current.play();
      setisplay(true);
    }
  };

  const handlevolume=(e)=>{
    audioelem.current.volume=e.target.value/100;
  }
  const handlenextsong=async()=>{
    console.log("runned");
    let index=localStorage.getItem("index");
    index=Number(index);
    index+=1;
    if(songlist.length===0){
      index=0;
    }
    else{
      if(index===songlist.length){
        index=0;
      }
      addrecentsong(songlist[index]._id);
      setcurrentsong(songlist[index]);
      localStorage.setItem("index",index);
      // await audioelem.current.load();
    }
    audioelem.current.currentTime=0;
    // await audioelem.current.play();
    setisplay(true);
  }
  const handleprevioussong=async()=>{
    let index=localStorage.getItem("index");
    index=Number(index);
    index-=1;
    if(songlist.length===0){
      index=0;
    }
    else{
      if(index===-1){
        index=songlist.length-1;
      }
      addrecentsong(songlist[index]._id);
      setcurrentsong(songlist[index]);
      localStorage.setItem("index",index);
    }
    await audioelem.current.load();
    await audioelem.current.play();
    setisplay(true);
    audioelem.current.currentTime=0;
  }


  return (
    <musiccontext.Provider value={{gethomedat,allartist,language,songtype,recent,currentsong,setcurrentsong,songlist,setsonglist,getartistsong,getlanguagesong,getsongtypesong,
      handleplaypause,handleprevioussong,handlenextsong,handlnoconnection,handleend,checkWidth,handlevolume,onPlaying,audioelem,clickRef,isplay,setisplay}}>{props.children}</musiccontext.Provider>
  );
};

export default Musicstate;
