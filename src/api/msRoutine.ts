import { isAxiosError } from "axios";
import { msRoutineApi } from "../config/api/msRoutine.api.config";
import { RoutineType } from "../domain/entities/routines.type";

export class msRoutine {
    static getRoutineById = async (id: string) => {
        try {
            const {data} = await msRoutineApi.get<RoutineType>(`?id=${id}`);
            return data;
        } catch (error) {
            if (isAxiosError(error)) {
                console.log(error.response?.data);
            }else{
                console.log(error);
            }
        }
    }

    static getAllRoutines = async () => {
        try {
            const {data} = await msRoutineApi.get<RoutineType[]>('/all');
            return data;
        } catch (error) {
            if (isAxiosError(error)) {
                console.log(error.request.data);
            }else{
                console.log(error);
            }
        }
    }
}