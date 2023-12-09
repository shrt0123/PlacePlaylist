import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [location, setLocation] = useState(null);
  const [playlist, setPlaylist] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  useEffect(() => {
    const getLocation = async () => {
      try {
        const dummyLocation = { id: 1, latitude: 37.7749, longitude: -122.4194 };
        setLocation(dummyLocation);
        getPlaylist(dummyLocation.id);
      } catch (error) {
        console.error('Error getting location:', error);
      }
    };

    getLocation();
  }, []);

  const getPlaylist = async (locationId) => {
    try {
      const response = await axios.get(`http://localhost:3001/playlists?locationId=${locationId}`);
      setPlaylist(response.data);
    } catch (error) {
      console.error('Error getting playlist:', error);
    }
  };

  const showSongs = (playlist) => {
    setSelectedPlaylist(playlist);
  };

  return (
    <div className="App">
      <h1>PP(Place Playlist)</h1>
      {location && (
        <p>
          Your current location: {location.latitude}, {location.longitude}
        </p>
      )}
      <h2>Playlist</h2>
      <ul>
        {playlist.map((playlist) => (
          <li key={playlist.id} onClick={() => showSongs(playlist)}>
            {playlist.title}
          </li>
        ))}
      </ul>
      {selectedPlaylist && (
        <div>
          <h2>Songs in {selectedPlaylist.title}</h2>
          <ul>
            {selectedPlaylist.songs.map((song) => (
              <li key={song.id}>{`${song.title} by ${song.artist}`}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
