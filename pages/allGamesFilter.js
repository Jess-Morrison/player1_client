import React from 'react';
// import React, { useState, useEffect } from 'react';
import BtnFilter from '../components/btnFilter';
// import { getVideoGames } from '../utils/data/videoGameData';
// import { useAuth } from '../utils/context/authContext';

export default function MainPage() {
  // const [videoGames, setvideoGames] = useState([]);
  // const { user } = useAuth();

  // useEffect(() => {
  //   getVideoGames(user.uid).then(setvideoGames);
  // },
  // [user.uid]);

  return (
    <div className="text-center my-4">
      {/* {videoGames.map((videoGame) => (
        <> */}
      <h1 style={{ fontSize: '5rem' }}> The Collection </h1>
      <BtnFilter />
      {/* </>
      ))} */}
    </div>
  );
}
