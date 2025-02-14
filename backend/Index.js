require("dotenv").config();
const express = require("express");
const axios = require("axios");
const ytSearch = require("yt-search");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

let spotifyAccessToken = "";

// 🔹 Get Spotify Access Token
async function getSpotifyToken() {
  const response = await axios.post(
    "https://accounts.spotify.com/api/token",
    "grant_type=client_credentials",
    {
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
        ).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  spotifyAccessToken = response.data.access_token;
}

// 🔹 Fetch Playlist Details

app.get("/playlist", async (req, res) => {
  try {
    const playlistUrl = req.query.url;
    const playlistId = playlistUrl.split("playlist/")[1].split("?")[0];

    if (!spotifyAccessToken) await getSpotifyToken();

    const response = await axios.get(
      `https://api.spotify.com/v1/playlists/${playlistId}`,
      { headers: { Authorization: `Bearer ${spotifyAccessToken}` } }
    );

    const tracks = response.data.tracks.items.map((item) => ({
      name: item.track.name,
      artist: item.track.artists.map((a) => a.name).join(", "),
    }));

    res.json({ playlistName: response.data.name, tracks });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch playlist" });
  }
});

// 🔹 Search Track on YouTube
app.get("/search", async (req, res) => {
  try {
    const { song } = req.query;
    const result = await ytSearch(song);
    res.json({ videoUrl: result.videos.length ? result.videos[0].url : null });
  } catch (error) {
    res.status(500).json({ error: "Failed to search YouTube" });
  }
});

// Start server
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
