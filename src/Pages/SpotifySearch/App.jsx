import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../Components/Navbar/App";
import "./App.scss";
import { Link, Music, Download } from "lucide-react";

const truncateTitles = () => {
  document.querySelectorAll(".songInfo").forEach((title) => {
    let screenWidth = window.innerWidth;
    let maxLength = screenWidth > 768 ? 80 : screenWidth > 480 ? 60 : 40;

    if (title.innerText.length > maxLength) {
      title.innerText = title.innerText.substring(0, maxLength) + "...";
    }
  });
};

function MusicCard({ track, onDownload }) {
  return (
    <div id="musicCard">
      <Music />
      <li className="songInfo">{track.name} - {track.artist}</li>
      <button onClick={() => onDownload(track)}>Download</button>
    </div>
  );
}
  
function App() {
  const [playlistData, setPlaylistData] = useState(null);
  const [playlistUrl, setPlaylistUrl] = useState("");
  const [downloading, setDownloading] = useState(false);

  const fetchPlaylist = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/playlist?url=${playlistUrl}`);
      setPlaylistData(response.data);
    } catch (error) {
      console.error("Error fetching playlist data", error);
    }
  };

  const downloadTrack = async (track) => {
    try {
      console.log("Sending request with:", track);

      const response = await axios.post("http://localhost:5000/download", {
        videoUrl: `${track.name} - ${track.artist}`,
      });

      console.log("Response:", response.data);
    } catch (error) {
      console.error("Download failed", error.response?.data || error.message);
    }
  };

  const bulkDownload = async () => {
    try {
      setDownloading(true);
      for (const track of playlistData.tracks) {
        await downloadTrack(track);
      }
      alert("Bulk download started!");
    } catch (error) {
      console.error("Bulk download failed", error);
    } finally {
      setDownloading(false);
    }
  };

  useEffect(() => {
    truncateTitles();
    window.addEventListener("resize", truncateTitles);
    return () => window.removeEventListener("resize", truncateTitles);
  }, []);

  return (
    <>
      <Navbar />
      <div className="mainPageWrapper">
        <div className="searchWrapper">
          <h2>Spotify Playlist Downloader</h2>
          <p>Download any public Spotify playlist as MP3!</p>
          <div id="searchInput">
            <Link />
            <input type="text" placeholder="Paste Spotify playlist URL" value={playlistUrl} onChange={(e) => setPlaylistUrl(e.target.value)} />
            <button onClick={fetchPlaylist}>Search</button>
          </div>
          <button className="mobileButton" onClick={fetchPlaylist}>Search</button>
        </div>
      </div>

      {playlistData && (
        <div className="playlistDataWrapper">
          <div className="playlistDataHead">
            <h2>Playlist: {playlistData.playlistName}</h2>
            <button onClick={bulkDownload} disabled={downloading}> 
              <Download /> Bulk Download 
            </button>
          </div>
          {playlistData.tracks.map((track, index) => (
            <MusicCard key={index} track={track} onDownload={downloadTrack} />
          ))}
        </div>
      )}
    </>
  );
}

export default App;
