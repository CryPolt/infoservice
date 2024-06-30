import create from 'zustand';
import { XYPosition } from '@xyflow/react'; // Ensure XYPosition is correctly imported

interface AppState {
  connectionLinePath: XYPosition[];
  setConnectionLinePath: (connectionLinePath: XYPosition[]) => void;
}

export const useAppStore = create<AppState>((set) => ({
  connectionLinePath: [],
  setConnectionLinePath: (connectionLinePath: XYPosition[]) => {
    set({ connectionLinePath });
  },
}));
