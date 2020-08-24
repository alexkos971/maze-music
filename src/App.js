import React, { useState, useEffect} from 'react';
import axios from 'axios';

import './index.scss';
import Sidebar from './components/Sidebar';
import Main from './components/Main';
import Player from './components/Player';

function App() {

  const [songs, setSongs] = useState([]);
  const [nowSong, setNowSong] = useState({});
  const [sidebar, setSidebar] = useState({
    "library" : [
        {
          "name": "Playlist",
          "icon": "stream",
          "id": 1
        },
        {
          "name": "Artist",
          "icon": "user",
          "id": 2
        },
        {
          "name": "Albums",
          "icon": "compact-disc",
          "id": 3
        },
        {
          "name": "Songs",
          "icon": "music",
          "id": 4
    }],
    "discover": [
        {
          "name": "Store",
          "icon": "square",
          "id": 5
        },
        {
          "name": "Radio",
          "icon": "broadcast-tower",
          "id": 6
        },
        {
          "name": "For You",
          "icon": "heart",
          "id": 7
        },
        {
          "name": "Browse",
          "icon": "window-restore",
          "id": 8
        }],
    "footer" : [
      {
        "v" : "1.0",
        "update": "now"
    }]
  })
  
  const [artists, setArtists] = useState([]);
  const [list, setList] = useState(2);
  const [dir, setDir] = useState("Artist");
  const [full, setFull] = useState(false);
  const [startSong, setStartSong] = useState(false);

  // Set song, nowSong and sidebar
  useEffect(() => {
    axios.get("http://localhost:3001/songs/")
      .then(({ data }) => {
        setSongs(data); 
      })
      .then(() => {
        setNowSong(songs[0]);
      })
      .catch(err => console.log(err));

    axios.get("http://localhost:3001/sidebar/")
      .then(({ data }) => {
        setSidebar(data);
      })  
  }, [songs]);
      
    // Artists - list of most popular
  useEffect(() => {
    const params = {
        api:  "b6927779e0a8d1da0ef48fa9a0924851",
        limit: 5,
    };
        
    axios.get(`http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=${params.api}&format=json&limit=${params.limit}`)
      .then(({ data }) => {
        setArtists(data.artists.artist);
      });
  }, [])

  const onClickItem = (id, item) => {
    item.map(el => {
      if (el.id === id) {
        setList(id);
        setFull(false);
        setDir(el.name);
      }
      return el;
    });
  }

  // Template of song time
  const timeTemplate = s => {
    return (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + ~~(s);
  }


  return (
    <div className="music">

      {sidebar ? (<Sidebar 
        data={sidebar} 
        onClickItem={onClickItem}
        current={list}/>) : (<h1 className="load_title">Loading...</h1>)}

      {nowSong ? (<Main 
        full={full} 
        title={dir}
        artists={artists}
        songs={songs}
        nowSong={nowSong}
        setNowSong={setNowSong}
        start={startSong} 
        setStart={setStartSong}
        timeTemplate={timeTemplate}/>
      ) : (<h1 className="load_title">Loading...</h1>)}

      {nowSong ? (<Player 
        view={setFull} 
        viewState={full} 
        song={nowSong} 
        songs={songs}
        start={startSong} 
        setStart={setStartSong}
        timeTemplate={timeTemplate}/>) : (<h1 className="load_title">Loading...</h1>)}
    
    </div>
  );
}

export default App;
