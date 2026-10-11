import { call, put, takeEvery } from 'redux-saga/effects';
import { fetchRiskPoints } from '@/api/riskApi';
import type { RiskPoint } from '@/types';
import {
  fetchRiskPointsFailed,
  fetchRiskPointsRequested,
  fetchRiskPointsSucceeded,
} from './riskSlice';

function* handleFetchRiskPoints() {
  try {
    const points: RiskPoint[] = yield call(fetchRiskPoints);
    yield put(fetchRiskPointsSucceeded(points));
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to load risk points';
    yield put(fetchRiskPointsFailed(message));
  }
}

export function* riskSaga() {
  yield takeEvery(fetchRiskPointsRequested.type, handleFetchRiskPoints);
}
