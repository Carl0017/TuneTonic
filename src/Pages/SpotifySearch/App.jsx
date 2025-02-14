import React from 'react'
import Navbar from "../../Components/Navbar/App"

import "./App.scss"
import { Link } from 'lucide-react'


function App() {
  return (
    <>
    <Navbar/>

      <div className="mainPageWrapper">
      <div className="searchWrapper">
        <h2>
          Spotify Playlist Downloader
        </h2>
        <p>
        Download any public Spotify playlist, convert tracks to MP3, and take your music offline effortlessly!
        </p>

        <div id="searchInput">
            <Link />
            <input type="text" placeholder='Paste a Spotify playlist URL here' />
            <button>
              Search
            </button>
        </div>

       <div id="downloadConsent">
         <p>By downloading this Spotify Playlist, you agree to the <span style={{color:"",}}>Usage Guidelines.</span></p>
       </div>
     </div>
      </div>
    
    </>
  )
}

export default App
