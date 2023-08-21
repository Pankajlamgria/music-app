import React from 'react'
import musiccontext from '../context/Musincontext'
import { useContext } from 'react'
import Songfoldersongs from './Songfoldersongs';
const Allsongs = () => {
    const contextcontent=useContext(musiccontext);

  return (
    <div id='allsongid'>
       <div className="resultsonglist">
        {contextcontent.tempsonglist.map((singlesong)=>{
          return <Songfoldersongs key={singlesong._id} song={singlesong}/>
            // return <Songlist  key={singlesong._id} song={singlesong}/>
          })}
        </div>
    </div>
  )
}

export default Allsongs
