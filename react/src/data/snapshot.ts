export interface Snapshot
{
    Id:number,
    State:string,
    Price: number,
    Demand?: number|null,
    Generation?: number|null,
} 