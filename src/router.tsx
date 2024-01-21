import { createBrowserRouter } from "react-router-dom";
import { ErrorBoundary } from "./components/error-boundary";
import { Layout } from "./components/layout";
import { SingleStudio, StudioList } from "./components/studio";
import { AnimeList } from "./components/entries/anime/anime-list";
import { GameList } from "./components/entries/game/game-list";
import { MovieList } from "./components/entries/movie/movie-list";
import { SingleAnime } from "./components/entries/anime/single-anime";
import { SingleGame } from "./components/entries/game/single-game";
import { SingleMovie } from "./components/entries/movie/single-movie";

type Route = {
  name: string;
  url: string;
};

export const routes: Route[] = [
  {
    name: "Studios",
    url: "/",
  },
  {
    name: "Anime",
    url: "/anime",
  },
  {
    name: "Game",
    url: "/game",
  },
  {
    name: "Movie",
    url: "/movie",
  },
];

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: "/",
        element: <StudioList />,
      },
      {
        path: "/studio/:studioId",
        element: <SingleStudio />,
      },
      {
        path: "/anime",
        element: <AnimeList />,
      },
      {
        path: "/anime/:animeId",
        element: <SingleAnime />,
      },
      {
        path: "/game",
        element: <GameList />,
      },
      {
        path: "/game/:gameId",
        element: <SingleGame />,
      },
      {
        path: "/movie",
        element: <MovieList />,
      },
      {
        path: "/movie/:movieId",
        element: <SingleMovie />,
      },
    ],
  },
]);
