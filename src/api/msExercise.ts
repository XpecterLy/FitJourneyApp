import { isAxiosError } from "axios";
import { msExerciseApi } from "../config/api/msExercise.api.config";
import { ExerciseType } from "../domain/entities/exercise.type";

export class msExercise {
    static GetExerciseById = async (id: string) => {
        try {
            const {data} = await msExerciseApi.get<ExerciseType>(`?id=${id}`);
            return data;
        } catch (error) {
            if (isAxiosError(error)) {
                console.log(error);
            }else{
                console.log(error);
            }
        }
    }

    static getAllExercises = async () => {
        try {
            const {data} = await msExerciseApi.get<ExerciseType[]>('/all');
            return data;
        } catch (error) {
            if (isAxiosError(error)) {
                console.log(error);
            }else{
                console.log(error);
            }
        }
    }
}