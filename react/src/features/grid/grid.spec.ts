/*
  RUN npm test on CI/CD
*/ 
import {clearGridData, energyGridSelectorReducer, GridSelectorState,  selectGridData, } from './reducer';

const testData = [{Id:1, State: "QLD", Price: 47.56, Demand:6558, Generation:6964}];
const updatedTestData = [{Id:1, State: "QLD", Price: 555, Demand:555, Generation:555}];
describe('reducer', () => {
  const initialState: GridSelectorState =  {SavedData: {Snapshots: null}};

  it('should handle initial state', () => {
    expect(energyGridSelectorReducer(undefined, selectGridData(null))).toEqual({SavedData:{Snapshots:null}});
  });

  it('should handle initial save', () => {
    expect(energyGridSelectorReducer(initialState, selectGridData(testData))).toEqual({SavedData:{Snapshots:testData}});
  });

  it('should handle update', () => {
    expect(energyGridSelectorReducer(initialState, selectGridData(updatedTestData))).toEqual({SavedData:{Snapshots:updatedTestData}});
  });

  it('should handle clear', () => {
    expect(energyGridSelectorReducer(initialState, clearGridData(true))).toEqual({SavedData:{Snapshots:null}});
  });
});


