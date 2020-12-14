import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Redirect, Route } from 'react-router-dom';
import 'materialize-css';

import './index.scss';
import { useAuth } from './hooks/auth.hook';
import { useHttp } from './hooks/http.hook';
import { Context } from './context';

import Sidebar from './components/Sidebar';
import Main from './components/Main';
import Player from './components/Player';
import AuthPage from './components/AuthPage';

function App() {

  const {request} = useHttp();
  const { token, login, logout, profile } = useAuth();
  const isAuthenticated = !!token;

  let {sidebar, defaultPage } = useContext(Context);
  
  const [nowSong, setNowSong] = useState({});
  const [prevSong, setPrevSong] = useState({});
  const [nextSong, setNextSong] = useState({});

  const [me, setMe] = useState(null);
  const [dir, setDir] = useState('For you');
  const [night, setNight] = useState(JSON.parse(localStorage.getItem('userNight')));
  const [full, setFull] = useState(false);
  const [header, setHeader] = useState(false);
  const [startSong, setStartSong] = useState(false);
  const [save, setSave] = useState(nowSong.saved);
  const [fullScreen, setFullScreen] = useState(false);

  const getMy = useCallback(async () => {
    try {
      if (token) {
        const data = await request('/api/data/my', 'GET', null, {
          Authorization: `Bearer ${token}`
        });
        setMe(data);
        console.log(data)
      }
    }
    catch (e) {
      console.log(e)
    }
  }, [request, token]);

  useEffect(() => {
    getMy(); 
  }, [getMy]);

  const playSong = (play, item) => {
    setNowSong({
      "_id": item._id,
      "name": item.name,
      "artist": [
          item.artist[0],
          item.artist[1]
      ],
      "albums": item.albums,
      "src": item.src,
      "date": item.date,
      "cover": item.cover,
      "owner": item.owner
    }); 

    if (item._id === nowSong._id) {
        setStartSong(play);
    }
    else {
        setStartSong(!play);
    }
  }  

  const onNight = async() => {
    setNight(!night);
    localStorage.setItem('userNight', !night);
  }   
      
  // Check saved songs
  useEffect(() => {
    setSave(nowSong.saved);
  }, [nowSong])

  useEffect(() => {
    if (fullScreen) {
      document.body.requestFullscreen();
    }
    // document.body.cancelFullScreen();
  }, [fullScreen]);

  const onSaveSong = useCallback(async (id) => {
    try {
      setSave(!save);
      const data = await request(`/api/songs/save/${id}`, 'POST', null, {
        Authorization: `Bearer ${token}`
      });
      console.log('exist', data);
    }
    catch (e) {
      console.log(e);
    }
  }, [ request, token])

  const onSavePlaylist = (save, props) => {
    console.log(save, props);

    // axios.post('http://localhost:3001/playlists/', props)
    //   .then(res => console.log(res))
    //   .catch(err => console.log(err));
  }

  // Template of song time
  const timeTemplate = s => {
    return (s - (s %= 60)) / 60 + (10 < s ? ':' : ':0') + ~~(s);
  }

  document.addEventListener('keypress', e => {
    switch (e.code) {
      case 'Space':
        setStartSong(!startSong); 
        return;
      // case 'KeyF':
      //   setFullScreen(!fullScreen);
      //   return;
    }
  });
  

  // Clicks out of element for close
  // document.addEventListener('click', () => {
  //   setHeader(false);
  // });
  
  return (
    <Context.Provider value={{
      isAuthenticated, token, login, logout, profile, sidebar
    }}>
    
      {!isAuthenticated ?
        <Route path="/auth">
          <AuthPage/>: 
        </Route> :

  
      <div className={ !night ? "music-night" : "music"}>
        <Redirect to={defaultPage}/>

        {sidebar ? (<Sidebar dir={dir} setTitle={setDir} setHeader={setHeader} />) : (<h1 className="load_title">Loading...</h1>)}

        {nowSong ? (<Main 
          full={full}

          setDir={setDir}
          dir={dir}
          me={me}

          nowSong={nowSong}
          setNowSong={setNowSong}

          setPrevSong={setPrevSong}
          setNextSong={setNextSong}

          startSong={startSong} 
          setStartSong={setStartSong}
          playSong={playSong}

          timeTemplate={timeTemplate}

          save={save}
          onSaveSong={onSaveSong} 
          onSavePlaylist={onSavePlaylist}

          night={night}
          setNight={onNight}

          header={header}
          setHeader={setHeader}

          isAuthenticated={isAuthenticated} />
        ) : (<h1 className="load_title">Loading...</h1>)}

        {nowSong ? (<Player 
          view={setFull} 
          viewState={full}

          nowSong={nowSong} 
          setNowSong={setNowSong}

          prevSong={prevSong}
          nextSong={nextSong}

          startSong={startSong} 
          setStartSong={setStartSong}

          playSong={playSong}
          timeTemplate={timeTemplate}
          save={save}
          onSaveSong={onSaveSong} 
          fullScreen={fullScreen}
          setFullScreen={setFullScreen}/>) : (<h1 className="load_title">Loading...</h1>)}
      </div>
      }
    </Context.Provider>
  );
}

export default App;
