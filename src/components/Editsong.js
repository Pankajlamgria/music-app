import React, { useContext, useState } from 'react'
import Loading from "../img/loading.png"
import musiccontext from '../context/Musincontext';

const Editsong = () => {
    const contextcontent=useContext(musiccontext);
    const [loading,setloading]=useState(false);
    const [songdetail, setsongdetial] = useState({
        artistname: "",
        language: "",
        songtype: "",
      });
      const handledetailchange = async (e) => {
        setsongdetial({ ...songdetail, [e.target.name]: e.target.value });
      };
      const handleupload=async(e)=>{
        e.preventDefault();
        contextcontent.editsong(contextcontent.editsongid,songdetail.artistname,songdetail.language,songdetail.songtype);
      }
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
        <h2>Edit Song</h2>
        <form action="">
          
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
  )
}

export default Editsong
