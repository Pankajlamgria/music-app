import React, { useContext, useEffect } from 'react'
import musiccontext from '../context/Musincontext'
import Songfoldersongs from './Songfoldersongs';
import Favsong from './Favsong';

const Favourite = () => {
    const contextcontent=useContext(musiccontext);
    useEffect(()=>{
        contextcontent.getfavouratesong();
    },[])
  return (
    <div id='allsongid'>
       <div className="resultsonglist">
        {contextcontent.favsong.map((singlesong)=>{
          return <Favsong key={singlesong._id} song={singlesong}/>
          })}
        </div>
    </div>
  )
}

export default Favourite
