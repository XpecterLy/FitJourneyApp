export interface RoutineTrakingType {
    id:         string;
    routineId:  string;
    dateCreate: string;
    state:      string;
}

export interface InsertRoutineTrakingType {
    routineId: string;
}


export interface UpdateRoutineTrakingType {
    state: 'active' | 'completed';
}