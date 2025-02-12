import { useState } from 'react'

import './App.scss'
import { Music } from 'lucide-react'

import artist1 from "../../Assets/Artist/artist1.webp"
import artist2 from "../../Assets/Artist/artist2.webp"
import artist3 from "../../Assets/Artist/artist3.webp"
import artist4 from "../../Assets/Artist/artist4.webp"
import artist5 from "../../Assets/Artist/artist5.webp"
import artist6 from "../../Assets/Artist/artist6.webp"
import artist7 from "../../Assets/Artist/artist7.webp"
import artist8 from "../../Assets/Artist/artist8.webp"
import artist9 from "../../Assets/Artist/artist9.webp"
import artist10 from "../../Assets/Artist/artist10.webp"
import artist11 from "../../Assets/Artist/artist11.webp"
import artist12 from "../../Assets/Artist/artist12.webp"
import artist13 from "../../Assets/Artist/artist13.webp"
import artist14 from "../../Assets/Artist/artist14.webp"



function ArtistCard({imageUrl}){
  return(
      <div className="card" style={{backgroundImage: `url(${imageUrl})`}}></div>
  )
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="mainWrapper">
        <div className="artistImageWrapper">
           <div className="rowOne">
            <ArtistCard imageUrl={artist1}/>
            <ArtistCard imageUrl={artist2}/>
            <ArtistCard imageUrl={artist3}/>
            <ArtistCard imageUrl={artist4}/>
           </div>
           <div className="rowOne">
            <ArtistCard imageUrl={artist5}/>
            <ArtistCard imageUrl={artist6}/>
            <ArtistCard imageUrl={artist8}/>
            <ArtistCard imageUrl={artist9}/>
           </div>
           <div className="rowOne">
            <ArtistCard imageUrl={artist10}/>
            <ArtistCard imageUrl={artist11}/>
            <ArtistCard imageUrl={artist12}/>
           </div>
           <div className="rowOne">
            <ArtistCard imageUrl={artist13}/>
            <ArtistCard imageUrl={artist14}/>
           </div>
        </div>

        <div className="getStartedWrapper">
          
          <h2> 
            <Music /> 
            Your Playlist, Your Music, Anytime.
          </h2>

          <p>
          Bridging the Gap Between Streaming & Offline Listening. One Click, Endless Vibes.
          </p>

          <button>
            Get Started
          </button>
        </div>
      </div>
    </>
  )
}

export default App
