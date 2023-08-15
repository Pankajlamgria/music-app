// {require("dotenv").config();}
import React from "react";
import musiccontext from "./Musincontext.js";
import { useState } from "react";
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

  const getartistsong=async(artistname)=>{
    const response=await fetch(`${host}/api/song/homepage/artist/${artistname}`,{
        method:"GET",
        headers:{
            "Content-Type":"application/json",
        }
    });
    const artistresult=await response.json();
    if(artistresult.success){
          setsonglist(artistresult.filteredsongs);
          setcurrentsong(artistresult.filteredsongs[0]);
    }
    else{
      alert(artistresult.error);
    }
  }

  const getlanguagesong=async(language)=>{
    const response=await fetch(`${host}/api/song/homepage/language/${language}`,{
        method:"GET",
        headers:{
            "Content-Type":"application/json",
        }
    });
    const languageresult=await response.json();
    if(languageresult.success){
          setsonglist(languageresult.filteredsongs);
          setcurrentsong(languageresult.filteredsongs[0]);
    }
    else{
      alert(languageresult.error);
    }
  }
  const getsongtypesong=async(songtype)=>{
    const response=await fetch(`${host}/api/song/homepage/songtype/${songtype}`,{
        method:"GET",
        headers:{
            "Content-Type":"application/json",
        }
    });
    const songtyperesult=await response.json();
    if(songtyperesult.success){
          setsonglist(songtyperesult.filteredsongs);
          setcurrentsong(songtyperesult.filteredsongs[0]);
    }
    else{
      alert(songtyperesult.error);
    }
  }



  return (
    <musiccontext.Provider value={{gethomedat,allartist,language,songtype,recent,currentsong,setcurrentsong,songlist,setsonglist,getartistsong,getlanguagesong,getsongtypesong}}>{props.children}</musiccontext.Provider>
  );
};

export default Musicstate;