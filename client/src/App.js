import React, { useState, useContext, useCallback } from 'react';
import { Redirect } from 'react-router-dom';

import 'materialize-css';
import { connect } from 'react-redux';
import { onPlay, setHeader } from './redux/actions';

import './index.scss';
import { useAuth } from './hooks/auth.hook';
import { useHttp } from './hooks/http.hook';
import { Context } from './context';

import Sidebar from './components/Sidebar';
import Main from './components/Main';
import Player from './components/Player';
import AuthPage from './components/AuthPage';

function App({ dispatch, start, songs, song, dir, night }) {

  const {request, loading} = useHttp();
  const { token, login, logout } = useAuth();
  const isAuthenticated = !!token;

  let { sidebar } = useContext(Context);
  
  const [prevSong, setPrevSong] = useState({});
  const [nextSong, setNextSong] = useState({});

  const [save, setSave] = useState({});
  const [fullScreen, setFullScreen] = useState(false);



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
  }, [ request, token, save])

  const onSavePlaylist = (save, props) => {
    console.log(save, props);
  }

  document.addEventListener('keydown', e => {
    switch (e.code) {
      case 'Space':
        dispatch(onPlay(song, start))
        return;
      // case 'KeyF':
      //   setFullScreen(!fullScreen);
      //   return;
    }
  });


  
  // Clicks out of element for close
  document.addEventListener('click', (e) => {
    if (e.target.closest('.music__main-header-head') !== null) {
      // dispatch(setHeader(false));
    }
  });

  // Save last song before close window
  window.addEventListener('beforeunload', () => {
    localStorage.setItem('lastSong', JSON.stringify(song))
  });
  
  
  
  if (loading) {
    return (
      <h1 className="load_title">Loading...</h1>
    );
  } 

  return (

    <Context.Provider value={{
      isAuthenticated, token, login, logout, sidebar
    }}>
    
      {!isAuthenticated ?

        // <Route path="/auth">
          // <Redirect to={`/auth`}/>
          <AuthPage/>:

  
      <div className={ !night ? "music-night" : "music"}>
        <Redirect to={`/${dir}`}/>

        {sidebar ? (<Sidebar/>) : (<h1 className="load_title">Loading...</h1>)}

        {songs ? 
        (<Main 
          setPrevSong={setPrevSong}
          setNextSong={setNextSong}W

          save={save}
          onSaveSong={onSaveSong} 
          onSavePlaylist={onSavePlaylist}

          isAuthenticated={isAuthenticated} />
        ) : (<h1 className="load_title">Loading...</h1>)}

        <Player
          prevSong={prevSong}
          nextSong={nextSong}
          save={save}
          onSaveSong={onSaveSong} 
          fullScreen={fullScreen}
          setFullScreen={setFullScreen}/>
      </div>
      }
    </Context.Provider>
  );
}

const mapStateToProps = (state) => {
  return {
    start: state.onPlay.start,
    songs: state.songs.recomendSongs,
    song: state.onPlay.song,
    dir: state.changeDir.dir,
    night: state.interface.night,
    header: state.interface.header,
    // profile: state.profile.profile
  }
}

export default connect(mapStateToProps)(App);
 