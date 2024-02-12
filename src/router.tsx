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
import { AddStudio } from "./components/studio/add-studio";
import { UpdateStudio } from "./components/studio/update-studio";
import { AddAnime } from "./components/entries/anime/add-anime";
import { AddGame } from "./components/entries/game/add-game";
import { AddMovie } from "./components/entries/movie/add-movie";
import { UpdateAnime } from "./components/entries/anime/update-anime";
import { UpdateGame } from "./components/entries/game/update-game";
import { UpdateMovie } from "./components/entries/movie/update-movie";
import { MediaList } from "./components/entries/media/media-list";
import { SingleMedia } from "./components/entries/media/single-media";
import { AddMedia } from "./components/entries/media/add-media";
import { UpdateMedia } from "./components/entries/media/update-media";

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
    name: "Media",
    url: "/media",
  },
  {
    name: "Anime",
    url: "/anime",
  },
  {
    name: "Games",
    url: "/game",
  },
  {
    name: "Movies",
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
        path: "/studio/create",
        element: <AddStudio />,
      },
      {
        path: "/studio/update/:studioId",
        element: <UpdateStudio />,
      },
      {
        path: "/media",
        element: <MediaList />,
      },
      {
        path: "/media/:mediaId",
        element: <SingleMedia />,
      },
      {
        path: "/media/create",
        element: <AddMedia />,
      },
      {
        path: "/media/update/:mediaId",
        element: <UpdateMedia />,
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
      {
        path: "/anime/create",
        element: <AddAnime />,
      },
      {
        path: "/anime/update/:animeId",
        element: <UpdateAnime />,
      },
      {
        path: "/game/create",
        element: <AddGame />,
      },
      {
        path: "/game/update/:gameId",
        element: <UpdateGame />,
      },
      {
        path: "/movie/create",
        element: <AddMovie />,
      },
      {
        path: "/movie/update/:movieId",
        element: <UpdateMovie />,
      },
    ],
  },
]);
