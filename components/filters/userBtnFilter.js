import React, { useEffect, useState } from 'react';
import { useAuth } from '../../utils/context/authContext';
import { getVideoGames } from '../../utils/data/videoGameData';
// import { getGameGenres } from '../../utils/data/gameGenreData';
import VideoGameCard from '../cards/VideoGameCard';
// import SearchComponent from './searchComponent';

export default function UserBtnFilter() {
  const [games, setGames] = useState([]);
  // const [genres, setGenres] = useState([]);
  const [genresFilter, setGenresFilter] = useState([]);
  const [gameFilter, setGameFilter] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    getVideoGames().then(setGames);
  }, []);
  // console.warn(genresFilter);

  // useEffect(() => {
  //   getGameGenres().then(setGenresFilter);
  // }, []);

  // const gameGenre = () => games.map((game) => genresFilter.map((genreFilter) => {
  //   if (genreFilter.id === game.game_genre.id) {
  //     getGameGenres().then(setGenres);
  //   }
  //   return null;
  // }));

  // useEffect(() => {
  //   gameGenre();
  // }, []);

  // Get Movie info and grabs genre data then puts it in a State
  const getGameCardsGenres = () => {
    const gGenres = [];
    games.forEach((game) => {
      const gameType = game?.game_genre.game_genre_name;
      if (gameType && !gGenres.includes(gameType) && user.uid === game.user.uid) {
        gGenres.push(gameType);
      }
    });
    setGenresFilter(gGenres);
  };

  useEffect(() => {
    getGameCardsGenres();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [games]);

  // Function that renders Movies to the DOM

  // eslint-disable-next-line consistent-return
  const renderGames = () => {
    if (games.length) {
      return games.map((game) => {
        if (gameFilter === null && user.uid === game.user.uid) {
          return (
            <VideoGameCard
              key={game.id}
              id={game.id}
              gameGenre={game.game_genre.game_genre_name}
              gameTitle={game.game_title}
              imageUrl={game.image_url}
              purchaseLocation={game.purchase_location}
              gameFormat={game.game_format}
              description={game.description}
          // gameObj={videoGame}
              onUpdate={getVideoGames}
            />
          );
        }
        if (game.game_genre.game_genre_name === gameFilter && user.uid === game.user.uid) {
          return (
            <VideoGameCard
              key={game.id}
              id={game.id}
              gameGenre={game.game_genre.game_genre_name}
              gameTitle={game.game_title}
              imageUrl={game.image_url}
              purchaseLocation={game.purchase_location}
              gameFormat={game.game_format}
              description={game.description}
          // gameObj={videoGame}
              onUpdate={getVideoGames}
            />
          );
        }
        return null;
      });
    }
  };

  // Function that creates filter buttons
  const renderGenresFilter = () => {
    if (genresFilter.length > 0) {
      return genresFilter.map((genreFilter) => (
        <button
          key={genreFilter}
          type="button"
          style={{ margin: '5px', 'background-color': '#84190B' }}
          className="btn btn-secondary filterButton"
          onClick={() => setGameFilter(genreFilter)}
        >
          {genreFilter}
        </button>
      ));
    }
    return null;
  };

  // const renderGenresFilter = () => {
  //   // if (genreFilter.id === console.warn(newGame)) {
  //   // eslint-disable-next-line implicit-arrow-linebreak
  //   genres.map((genreFilterTwo) => (
  //     <button
  //       key={genreFilterTwo}
  //       type="button"
  //       style={{ margin: '5px', 'background-color': '#84190B' }}
  //       className="btn btn-secondary filterButton"
  //       onClick={() => setGameFilter(genreFilter)}
  //     >
  //       {genreFilterTwo}
  //     </button>
  //   ));
  // };
  // return null;

  // console.warn(genresFilter);

  // const renderGenresFilter = () => {
  //   const filteredGenres = games.reduce((acc, game) => {
  //     if (acc.includes(game.game_genre.game_genre_name)) {
  //       return acc;
  //     }
  //     if (genresFilter.includes(game.game_genre.game_genre_name)) {
  //       return [...acc, game.game_genre.game_genre_name];
  //     }
  //     return acc;
  //   }, []);

  //   return filteredGenres.map((filteredGenre) => (
  //     <button
  //       key={filteredGenre}
  //       type="button"
  //       style={{ margin: '5px', backgroundColor: '#84190B' }}
  //       className="btn btn-secondary filterButton"
  //       onClick={() => setGameFilter(filteredGenre)}
  //     >
  //       {filteredGenre}
  //     </button>
  //   ));
  // };

  // Function that renders buttons to the DOM
  return (
    <>
      <div className="filterButtons">
        {renderGenresFilter()}
        <button
          type="button"
          className="btn btn-secondary filterButton"
          style={{ 'background-color': '#84190B' }}
          onClick={() => setGameFilter(null)}
        >
          Clear
        </button>
      </div>

      {/* // *STRETCH* Function that renders search to the DOM */}
      <div className="text-center my-4">
        {/* <SearchComponent onSearch={setFilterSearchName} className="searchFilterForm" /> */}
        <div className="d-flex flex-wrap">
          {/* {renderMoviesSearch()}  */}
          {renderGames()}
        </div>
      </div>
    </>
  );
}
