import { isAxiosError } from "axios";
import { msRoutineTrakingExerciseApi } from "../config/api/msRoutineTrakingExercise.api.config";
import { RoutineTrakingExerciseType, SerieType } from "../domain/entities/routine_traking_exercise.type";

export class msRoutineTrakingExercise {
    static getRoutineTrakingExerciseById = async (id: string) => {
        try {
            const {data} = await msRoutineTrakingExerciseApi.get<RoutineTrakingExerciseType>(`?id=${id}`);
            return data;
        } catch (error) {
            if (isAxiosError(error)) {
                console.log(error.request);
            }else{
                console.log(error);
            }
        }
    }

    static getAllRoutinesTrakingExercise = async (
        limit?: number, 
        offset?: number, 
        routineTrakingId?: string,
        state?: string
    ) => {
        try {

            limit = limit  ? limit : 10;
            offset = offset ? offset : 1;

            const filter = `?limit=${limit}&offset=${offset}${routineTrakingId  ? `&routineTrakingId=${routineTrakingId}` : ''}${state ? `&state=${state}` : ''}`;

            const {data} = await msRoutineTrakingExerciseApi.get<RoutineTrakingExerciseType[]>(`/all${filter}`);
            
            return data;
        } catch (error) {
            if (isAxiosError(error)) {
                console.log(error.request);
            }else{
                console.log(error);
            }
        }
    }

    static addRoutineToTrakingExercise = async (id: string, dataSerie: SerieType) => {
        try {
            const {data} = await msRoutineTrakingExerciseApi.post<RoutineTrakingExerciseType>(`/add_serie?id=${id}`,
                {
                    "series": [
                        dataSerie
                    ]
                }
            );
            return data;
        } catch (error) {
            if (isAxiosError(error)) {
                console.log(error.request);
            }else{
                console.log(error);
            }
        }
    }
}