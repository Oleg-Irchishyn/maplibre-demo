import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import riskReducer from './riskSlice';
import { riskSaga } from './riskSaga';

export function makeStore() {
  const sagaMiddleware = createSagaMiddleware();

  const store = configureStore({
    reducer: {
      risk: riskReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
  });

  sagaMiddleware.run(riskSaga);

  return store;
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
