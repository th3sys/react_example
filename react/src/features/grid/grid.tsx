import React, { useEffect, useState } from 'react';
import {AgGridColumn, AgGridReact} from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { RootState } from '../../app/store';
import { connect } from 'react-redux';
import { Snapshot } from '../../data/snapshot';
import { clearGridData, GridState, selectGridData } from './reducer';
import _  from 'lodash';
import { CellEditingStoppedEvent } from 'ag-grid-community';

interface Props {
    gridSavedState: GridState;
    clearData:(e:boolean)=>void;
    saveData:(e:Snapshot[]|null)=>void;
}

const DataGridComponent:  React.FC<Props>  = ({gridSavedState,clearData,saveData,...props}) => {
    const [rowData, setRowData] = useState<Snapshot[]>([]);
    const [text,setText] = useState('');

    useEffect(() => {
        const initData = [
            {Id:1, State: "QLD", Price: 47.56, Demand:6558, Generation:6964},
            {Id:2, State: "NSW", Price: 50.00, Demand:7419, Generation:7197},
            {Id:3, State: "SA",  Price: 49.85, Demand:1092, Generation:1115},
            {Id:4, State: "VIC", Price: 52.40, Demand:4679, Generation:4014},
            {Id:5, State: "TAS", Price: 31.88, Demand:1203, Generation:1662},
        ];

        setRowData(initData);
        return () => {
            setRowData([]);
        }
    }, [])


   return (
       <React.Fragment>
       <div className="ag-theme-alpine" style={{height: 300, width: '100%'}}>
           <AgGridReact
                onCellEditingStopped={(e:CellEditingStoppedEvent) => {
                    setRowData((old)=>{
                        return old.map(i => {
                            if (i.Id !== e.data.Id) return i;
                            return e.data;
                        });
                    });
                }}
                defaultColDef={{
                    flex: 1,
                    minWidth: 110,
                    editable: true,
                    resizable: true,
                }}
               getRowNodeId={data => data.Id}
               rowData={rowData}>
               <AgGridColumn field="State"></AgGridColumn>
               <AgGridColumn field="Price"></AgGridColumn>
               <AgGridColumn field="Demand"></AgGridColumn>
               <AgGridColumn field="Generation"></AgGridColumn>
           </AgGridReact>
       </div>
       <button disabled={!gridSavedState?.Snapshots} 
                onClick={()=>{
                    clearData(true);
                    }}>Clear Data</button>
        <button disabled={_.isEqual(gridSavedState.Snapshots,rowData)}
                onClick={()=>{
                    saveData(rowData);
                }}>Save Data</button>
        <button onClick={()=>{
            fetch('https://8ks4rrgqp8.execute-api.us-east-1.amazonaws.com/TEST/test_lambda')
            .then(response => response.json())
            .then(data => setText(`${JSON.stringify(data)} received at ${Date()}`))
            .catch(console.log)
        }}>
            Call API
        </button>
        <br/>
        <br/>
        {text}
       </React.Fragment>
   );
};

const mapDispatchToProps = (dispatch: any) => ({
    clearData:(e:boolean)=>dispatch(clearGridData(e)),
    saveData:(e:Snapshot[]|null)=>dispatch(selectGridData(e)),
});
const MapStateToProps = (state: RootState) => ({
  gridSavedState: state.energyGrid.SavedData  
});
export const DataGrid = connect(
    MapStateToProps,
    mapDispatchToProps
  )(DataGridComponent);

