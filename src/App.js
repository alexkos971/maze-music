import React, { useState, useEffect} from 'react';
import { Route, useHistory } from 'react-router-dom';

import axios from 'axios';

import './index.scss';
import Sidebar from './components/Sidebar';
import Main from './components/Main';
import Player from './components/Player';

function App() {

  const [nowSong, setNowSong] = useState({
    "id": 1,
    "name": "Believer",
    "artist": "Imagine Dragons",
    "albums": "Evolve",
    "src": "https://mp3yoda.com/play/YWE1OWE1YjY3MTI4OWI2MGYyNGNmOTRjODgyYWIzZjEubXAz/",
    "cover": "https://mp3yoda.com/style/download_song/84bb4ff9bfc07c6611685fcc513eb6b4_large.jpg",
    "saved": false 
  });

  const [sidebar, setSidebar] = useState({
    "library": [
      {
        "name": "Playlist",
        "icon": "stream",
        "id": 1
      },
      {
        "name": "Artists",
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
      }
    ],
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
      }
    ],
    "footer": [
      {
        "v": "1.0",
        "update": "now"
      }
    ]
  })
  const [sidebarItem, setSidebarItem] = useState(2)

  const [night, setNight] = useState(true);

  const [full, setFull] = useState(false);
  const [startSong, setStartSong] = useState(false);
  const [save, setSave] = useState(nowSong.saved);
  const [fullScreen, setFullScreen] = useState(false);

  const [title, setTitle] = useState(sidebar.library[1].name);


  // Set title and path
  useEffect(() => {
    if (sidebarItem < 5) {
      setTitle(sidebar.library[sidebarItem - 1].name);
    }
    else {
      setTitle(sidebar.discover[sidebarItem - 1].name);
    }
  }, [sidebarItem])

  // Set nowSong
  useEffect(() => {
    setNowSong(nowSong);
  }, [nowSong]);

  // Set sidebar
  useEffect(() => {
    axios.get("http://localhost:3001/sidebar")
      .then(({data}) => {
        setSidebar(data);
      })
      // setSidebarItem(sidebarItem);
  }, [sidebar])

  useEffect(() => {
    axios.get("http://localhost:3001/mode")
      .then(({ data }) => {
        setNight(data.night);
      })
  }, [])
      
  // Check saved songs
  useEffect(() => {
    setSave(nowSong.saved);
  }, [nowSong])

  useEffect(() => {
    if (fullScreen) {
        document.body.requestFullscreen();
    }
    // document.body.cancelFullScreen();
  }, [fullScreen])  

  const onSaveSong = (save, id) => {
    setSave(!save);
    axios.patch('http://localhost:3001/songs/' + id, {
      saved: !save
    })
    .catch(err => console.log(err));
  }

  const onClickItem = id => {
    
    if (id < 5) {
      setTitle(sidebar.library[id - 1].name);
    }
    else {
      setTitle(sidebar.discover.filter(item => id === item.id).name);
    }
    setSidebarItem(id);
    console.log(title)
  }

  const onActiveNightMode = () => {
    axios.patch("http://localhost:3001/mode", {
      night: !night
    });
    setNight(!night);
  }

  // Template of song time
  const timeTemplate = s => {
    return (s - (s %= 60)) / 60 + (10 < s ? ':' : ':0') + ~~(s);
  }

  document.addEventListener('keydown', e => {
    switch (e.code) {
      case 'Space':
        setStartSong(!startSong); 
        return;
      case 'KeyF':
        setFullScreen(!fullScreen);
        return;
    }
  });

  return (
    <div className={ !night ? "music-night" : "music"}>

      {sidebar ? (<Sidebar 
        sidebarItem={sidebarItem}
        data={sidebar} 
        onClickItem={onClickItem}/>) : (<h1 className="load_title">Loading...</h1>)}

      {nowSong ? (<Main 
        full={full}
        title={title} 
        sidebarItem={sidebarItem}
        nowSong={nowSong}
        setNowSong={setNowSong}
        start={startSong} 
        setStart={setStartSong}
        timeTemplate={timeTemplate}
        save={save}
        onSaveSong={onSaveSong} 
        night
        setNight={onActiveNightMode}/>
      ) : (<h1 className="load_title">Loading...</h1>)}

      {nowSong ? (<Player 
        view={setFull} 
        viewState={full} 
        song={nowSong} 
        start={startSong} 
        setStart={setStartSong}
        timeTemplate={timeTemplate}
        save={save}
        onSaveSong={onSaveSong} 
        fullScreen={fullScreen}
        setFullScreen={setFullScreen}/>) : (<h1 className="load_title">Loading...</h1>)}
    
    </div>
  );
}

export default App;
