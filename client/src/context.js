import React from 'react';

function noop() {}

export let Context = React.createContext({
    isAuthenticated: false,
    token: false,
    sidebar: [
      {
        "name": "For you",
        "icon": "heartbeat",
        "id": 1
      },
      {
        "name": "Artists",
        "icon": "users",
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
      },
      {
        "name": "Playlists",
        "icon": "stream",
        "id": 5
      },
      {
        "name": "Search",
        "icon": "search",
        "id": 6
      },
      {
        "name": "Upload",
        "icon": "cloud-upload-alt",
        "id": 7
      }],
    defaultPage: "Upload",
    login: noop,
    my: {},
    logout: noop
});