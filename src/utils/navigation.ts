import { BASE_URL } from "../api";

export const getUrl = (path: string | (string | undefined)[]) => {
  if (Array.isArray(path)) {
    return path.reduce((accumulator, currentValue) => {
      if (!currentValue) {
        throw new Error("Path segment cannot be undefined");
      }

      return accumulator + "/" + currentValue;
    }, BASE_URL);
  }

  return `${BASE_URL}/${path}`;
};
