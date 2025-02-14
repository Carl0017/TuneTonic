import React, { useState } from "react";
import axios from "axios";

import Navbar from "../../Components/Navbar/App";

import "./App.scss";
import { Link, Music } from "lucide-react";

//playlist data card

function MusicCard({trackKey, TrackInfo}) {
  return (
      <div id="musicCard">
        <Music />
        <li>{TrackInfo}</li>
        <button>Download</button>
      </div>
  );
}

function App() {
  const [playlistData, setPlaylistData] = useState(null);
  const [searchResult, setSearchResult] = useState(null);
  const [song, setSong] = useState("");
  const [playlistUrl, setPlaylistUrl] = useState("");

  // Fetch playlist data from backend
  const fetchPlaylist = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/playlist?url=${playlistUrl}`
      );
      setPlaylistData(response.data);
    } catch (error) {
      console.error("Error fetching playlist data", error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="mainPageWrapper">
        <div className="searchWrapper">
          <h2>Spotify Playlist Downloader</h2>
          <p>
            Download any public Spotify playlist, convert tracks to MP3, and
            take your music offline effortlessly!
          </p>

          <div id="searchInput">
            <Link />
            <input
              type="text"
              placeholder="Paste a Spotify playlist URL here"
              value={playlistUrl}
              onChange={(e) => setPlaylistUrl(e.target.value)}
            />
            <button onClick={fetchPlaylist}>Search</button>
          </div>

          <button className="mobileButton">Search</button>

          <div id="downloadConsent">
            <p>
              By downloading this Spotify Playlist, you agree to the{" "}
              <span style={{ color: "" }}>Usage Guidelines.</span>
            </p>
          </div>
        </div>
      </div>

      {playlistData && (
        <div className="playlistDataWrapper">
          <h2>Playlist Title : {playlistData.playlistName}</h2>

          {/*  {playlistData.tracks.map((track, index) => (
            <p key={index}>
              {track.name} - {track.artist}
            </p>
          ))}
            */}

          {playlistData.tracks.map((track, index) => (
            <MusicCard key={index} trackKey={index} TrackInfo={`${track.name} - ${track.artist}`} />
          ))}
        </div>
      )}
    </>
  );
}

export default App;
