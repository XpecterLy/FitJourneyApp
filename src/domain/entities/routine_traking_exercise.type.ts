export interface RoutineTrakingExerciseType {
    id:               string;
    routineTrakingId: string;
    exerciseId:       string;
    series:           SerieType[];
}

export interface SerieType {
    repetitions: number;
    weight:      number;
    time:        number;
}
