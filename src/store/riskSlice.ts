import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RiskPoint } from '@/types';

export type RiskStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

interface RiskState {
  points: RiskPoint[];
  selectedId: string | null;
  status: RiskStatus;
  error: string | null;
}

const initialState: RiskState = {
  points: [],
  selectedId: null,
  status: 'idle',
  error: null,
};

const riskSlice = createSlice({
  name: 'risk',
  initialState,
  reducers: {
    // Dispatched by a component; the saga, not this reducer, performs the fetch.
    fetchRiskPointsRequested(state) {
      state.status = 'loading';
      state.error = null;
    },
    fetchRiskPointsSucceeded(state, action: PayloadAction<RiskPoint[]>) {
      state.status = 'succeeded';
      state.points = action.payload;
    },
    fetchRiskPointsFailed(state, action: PayloadAction<string>) {
      state.status = 'failed';
      state.error = action.payload;
    },
    riskPointSelected(state, action: PayloadAction<string>) {
      state.selectedId = action.payload;
    },
  },
});

export const {
  fetchRiskPointsRequested,
  fetchRiskPointsSucceeded,
  fetchRiskPointsFailed,
  riskPointSelected,
} = riskSlice.actions;

export default riskSlice.reducer;
