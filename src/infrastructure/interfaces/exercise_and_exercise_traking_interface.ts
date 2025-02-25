import { ExerciseType } from "../../domain/entities/exercise.type";
import { RoutineTrakingExerciseType } from "../../domain/entities/routine_traking_exercise.type";

export interface ExerciseAndExerciseTrakingInteface {
    exercise: ExerciseType;
    exerciseTraking: RoutineTrakingExerciseType;
}

