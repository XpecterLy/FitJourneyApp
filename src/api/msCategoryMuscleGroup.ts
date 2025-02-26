import { isAxiosError } from "axios";
import { msCategoriesMuscleGroupApi } from "../config/api/msCategoriesMuscleGroup";
import { CategoryMuscleGroupType } from "../domain/entities/categoryMuscleGroup.type";

export class msCategoryMuscleGroup {
    static GetCategoryMuscleGroupById = async (id: string) => {
        try {
            const {data} = await msCategoriesMuscleGroupApi.get<CategoryMuscleGroupType>(`?id=${id}`);
            return data;
        } catch (error) {
            if (isAxiosError(error)) {
                console.log(error);
            }else{
                console.log(error);
            }
        }
    }

    static getAllECategoryMuscleGroup = async () => {
        try {
            const {data} = await msCategoriesMuscleGroupApi.get<CategoryMuscleGroupType[]>('/all');
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