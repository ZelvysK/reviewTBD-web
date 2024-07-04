import { create } from "zustand";
import { StudioType } from "@/__generated__/graphql";

interface StudioTableState {
  pageNumber: number;
  totalCount: number;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  studioType?: StudioType;
  term?: string;
}

interface StudioTableActions {
  setCurrentPage: (pageNumber: number) => void;
  setPageInfo: (pageInfo: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    totalCount: number;
  }) => void;
  handleNextPage: () => void;
  handlePreviousPage: () => void;
  setStudioType: (studioType?: StudioType) => void;
  setTerm: (term?: string) => void;
}

export const useStudioTableStore = create<
  StudioTableState & StudioTableActions
>((set, get) => ({
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
  setStudioType: (studioType) => set(() => ({ studioType })),
  setTerm: (term) => set(() => ({ term })),
}));
