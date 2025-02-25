import { MyCard } from "../UI/MyCards"
import { Text } from "@ui-kitten/components";

interface Props {
    routineTrakingId: string;
    routineName: string;
    routineTrakingDateCreate: string;
    routineTrakingState: string;
}

export const CardRoutineTraking = ({
    routineName,
    routineTrakingDateCreate,
    routineTrakingId,
    routineTrakingState
}: Props) => {
    return (
        <MyCard isDisable key={routineTrakingId}> 
            <Text category="h6" style={{color: '#6C63FF'}} > {routineName} </Text>
            <Text style={{color: '#4c4b4e'}}> {routineTrakingDateCreate} </Text>
            <Text status={(routineTrakingState == 'active' ? 'success' : 'info' )}> {routineTrakingState.toUpperCase()} </Text>
        </MyCard>
    )
}