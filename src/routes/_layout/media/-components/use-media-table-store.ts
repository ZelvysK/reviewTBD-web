import { create } from "zustand";
import { MediaType } from "@/__generated__/graphql";

interface MediaTableState {
  pageNumber: number;
  totalCount: number;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  mediaType?: MediaType;
  term?: string;
}

interface MediaTableActions {
  setCurrentPage: (pageNumber: number) => void;
  setPageInfo: (pageInfo: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    totalCount: number;
  }) => void;
  handleNextPage: () => void;
  handlePreviousPage: () => void;
  setMediaType: (mediaType?: MediaType) => void;
  setTerm: (term?: string) => void;
}

export const useMediaTableStore = create<MediaTableState & MediaTableActions>(
  (set, get) => ({
    totalCount: 0,
    pageNumber: 1,
    setPageInfo: (pageInfo) => set(() => ({ ...pageInfo })),
    setCurrentPage: (pageNumber) => set(() => ({ pageNumber })),
    handleNextPage: () => {
      if (get().hasNextPage) {
        set(({ pageNumber }) => ({ pageNumber: pageNumber + 1 }));
      }
    },
    handlePreviousPage: () => {
      if (get().hasPreviousPage) {
        set(({ pageNumber }) => ({ pageNumber: pageNumber - 1 }));
      }
    },
    setMediaType: (mediaType) => set(() => ({ mediaType })),
    setTerm: (term) => set(() => ({ term })),
  }),
);
