import { Divider } from "@ui-kitten/components";

interface Props {
    color?: string;
    marginVertical?: number;
    marginHorizontal?: number;
}

export const MyDivider = ({
        color = '#6C63FF', 
        marginHorizontal = 20, 
        marginVertical = 10
    }: Props) => {

    return (
        <Divider style={{backgroundColor: color, marginVertical: marginVertical, marginHorizontal: marginHorizontal }}/>
    )
}