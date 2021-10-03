import { Snapshot } from "../../data/snapshot";
import produce from "immer"
import _ from "lodash";

export interface GridState {
    Snapshots: Snapshot[]|null
  }
  
  // REDUX STATE
  export interface GridSelectorState {
      SavedData:  GridState;
  }
  
  // action
  export const GRID_SELECTED = 'GRID_SELECTOR/GRID_SELECTED';
  interface GridSelectedAction {
      type: typeof GRID_SELECTED
      payload: Snapshot[]|null
  }
  export const GRID_CLEARED = 'GRID_SELECTOR/GRID_CLEARED';
  interface GridClearedAction {
      type: typeof GRID_CLEARED
      payload: boolean
  }
  
  export type GridSelectorActionTypes = GridSelectedAction | GridClearedAction
  
  // action creators
  export function selectGridData(p: Snapshot[]|null): GridSelectorActionTypes {
      return {
        type: GRID_SELECTED,
        payload: p
      }
  }
  export function clearGridData(p: boolean): GridSelectorActionTypes {
    return {
      type: GRID_CLEARED,
      payload: p
    }
  }
  
  const initialState: GridSelectorState = {SavedData: {Snapshots: null}}
    
  
  export function energyGridSelectorReducer(
      state = initialState,
      action: GridSelectorActionTypes
    ): GridSelectorState {
      switch (action.type) {
          case GRID_CLEARED:
              return initialState;
          case GRID_SELECTED: {
              return {
                ...state,
                SavedData: {...state.SavedData, Snapshots:
                    produce(state.SavedData.Snapshots, draft => {
                        if (draft&&action.payload)
                        {
                            action.payload.forEach(x => {
                                const found = draft.findIndex(i => i.Id === x.Id);
                                if (found >=0 && !_.isEqual(x,draft[found]))
                                {
                                    draft[found] = _.cloneDeep(x);
                                }

                            } )
                            draft[3].State = action.payload[3].State;
                        } else 
                        {
                            return _.cloneDeep(action.payload);
                        }
                    })}
              }
            }
        default:
          return state
      }
    }