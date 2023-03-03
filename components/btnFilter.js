import React, { useEffect, useState } from 'react';
import { getVideoGames } from '../utils/data/videoGameData';
// import { getGameGenres } from '../utils/data/gameGenreData';
import VideoGameCard from './cards/VideoGameCard';
// import SearchComponent from './searchComponent';

export default function BtnFilter() {
  const [games, setGames] = useState([]);
  // const [genres, setGenres] = useState([]);
  const [genresFilter, setGenresFilter] = useState([]);
  const [gameFilter, setGameFilter] = useState(null);

  useEffect(() => {
    getVideoGames().then(setGames);
  }, []);

  // useEffect(() => {
  //   getGameGenres().then(setGenres);
  // }, []);

  // Get Movie info and grabs genre data then puts it in a State
  const getGameCardsGenres = () => {
    const gGenres = [];
    games.forEach((game) => {
      const gameType = game?.game_genre.game_genre_name;
      if (gameType && !gGenres.includes(gameType)) {
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
        if (gameFilter === null) {
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
        if (game.game_genre.game_genre_name === gameFilter) {
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
