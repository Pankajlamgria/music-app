import React, { useContext } from 'react'
import "../css/showall.css"
import musiccontext from '../context/Musincontext'
import Artistcard from './Artistcard';
import Languagecard from './Languagecard';
import Songtype from './Songtype';
const Showall = () => {
    const contextcontent=useContext(musiccontext);
  return (
    <div className='foldercontainer' >
        <div className="artistfolder" style={{display:(localStorage.getItem("folder")==="artist")?"flex":"none"}}>
        {contextcontent.allartist.map((artist) => {
            return <Artistcard key={artist._id} artist={artist}></Artistcard>;
          })}
        </div>
        <div className="artistfolder" style={{display:(localStorage.getItem("folder")==="songtype")?"flex":"none"}}>
        {contextcontent.songtype.map((songtype) => {
            return <Songtype key={songtype._id} artist={songtype}></Songtype>;
          })}
        </div>
        <div className="artistfolder" style={{display:(localStorage.getItem("folder")==="language")?"flex":"none"}}>
        {contextcontent.language.map((language) => {
            return (
              <Languagecard key={language._id} artist={language}></Languagecard>
            );
          })}
        </div>
    </div>
  )
}

export default Showall
