import { isAxiosError } from "axios";
import { msRoutineTrakingApi } from "../config/api/msRoutineTraking.api.config";
import type { InsertRoutineTrakingType, RoutineTrakingType, UpdateRoutineTrakingType } from "../domain/entities/routine_traking.type";
import { ResponseInsertRoutineTraking } from "../infrastructure/interfaces/routineTraking";

export class msRoutineTraking {
    static getRoutineTrakingById = async (id: string) => {
        try {
            const {data} = await msRoutineTrakingApi.get<RoutineTrakingType>(`?id=${id}`);
            return data;
        } catch (error) {
            if (isAxiosError(error)) {
                console.log(error.request);
            }else{
                console.log(error);
            }
        }
    }

    static getAllRoutinesTraking = async (
        limit?: number, 
        offset?: number, 
        routineId?: string,
        state?: string
    ) => {
        try {

            limit = limit  ? limit : 10;
            offset = offset ? offset : 1;

            const filter = `?limit=${limit}&offset=${offset}${routineId  ? `&routineId=${routineId}` : ''}${state ? `&state=${state}` : ''}`;

            const {data} = await msRoutineTrakingApi.get<RoutineTrakingType[]>(`/all${filter}`);
            
            return data;
        } catch (error) {
            if (isAxiosError(error)) {
                console.log(error.request);
            }else{
                console.log(error);
            }
        }
    }

    static insertRoutineTraking = async ( dataRoutineTraking: InsertRoutineTrakingType ) => {
        try {
            const {data} = await msRoutineTrakingApi.post<ResponseInsertRoutineTraking>(`/`, dataRoutineTraking);
            return data;
        } catch (error) {
            if (isAxiosError(error)) {
                console.log(error.request);
            }else{
                console.log(error);
            }
        }
    }

    static updateRoutineTraking = async ( id: string, dataRoutineTraking: UpdateRoutineTrakingType ) => {
        try {
            await msRoutineTrakingApi.put(`?id=${id}`, dataRoutineTraking);
        } catch (error) {
            if (isAxiosError(error)) {
                console.log(error.request);
            }else{
                console.log(error);
            }
        }
    }
}