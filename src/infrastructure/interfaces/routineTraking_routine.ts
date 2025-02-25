import { RoutineTrakingType } from "../../domain/entities/routine_traking.type";
import { RoutineType } from "../../domain/entities/routines.type";

export interface routineTraking_routine_type{
    routine: RoutineType;
    routines_traking: RoutineTrakingType;
}