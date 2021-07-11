import create from "zustand";
import {
  END_INDEX,
  START_INDEX,
} from "../../components/grid/hooks/useInitialGrid";

interface RoutePosState {
  sourceIndex: string;
  destinationIndex: string;
}
interface setRoutePosProps {
  sourceIndex?: string;
  destinationIndex?: string;
}

export interface useRoutePosProps {
  routePos: RoutePosState;
  setRoutePos: (params: setRoutePosProps) => void;
}

export const useRoutePos = create<useRoutePosProps>((set) => ({
  routePos: {
    sourceIndex: START_INDEX,
    destinationIndex: END_INDEX,
  },
  setRoutePos: (routePosState) =>
    set((state) => ({ routePos: { ...state.routePos, ...routePosState } })),
}));
