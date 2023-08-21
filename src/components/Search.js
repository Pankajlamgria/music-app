import React, { useContext, useState } from 'react'
import musiccontext from '../context/Musincontext';
import "../css/search.css";
import Songlist from './Songlist';
const Search = () => {
  const contextcontent=useContext(musiccontext);
  const [searchfilter,setsearchfilter]=useState({search:""});

  const handlesearchchange=(e)=>{

    setsearchfilter({...searchfilter,[e.target.name]:e.target.value});
  }
  const handlesearch=(e)=>{
    
    e.preventDefault();
    contextcontent.search(searchfilter.search);
  }
  return (
    <div >
      <div className="form">
        <form action="">
          <input type="text" id='searchinput' name='search' onChange={handlesearchchange} />
          <button id='searchbtn' onClick={handlesearch}>Search</button>
        </form>
      </div>
      <div className="searchresult">
        <h2 style={{display:(contextcontent.searchlist)?"none":"block"}}>No Result Found</h2>
        <div className="resultsonglist">
        {contextcontent.searchlist.map((singlesong)=>{
            return <Songlist  key={singlesong._id} song={singlesong}/>
          })}
        </div>
      </div>
    </div>
  )
}

export default Search
