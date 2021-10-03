import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import { energyGridSelectorReducer } from '../features/grid/reducer';

export const store = configureStore({
  reducer: combineReducers({
    energyGrid: energyGridSelectorReducer
  })
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
