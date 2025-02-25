import { Text } from "@ui-kitten/components";

interface Props {
    text: string;
}

export const SubTitle = ({text}: Props) => {
    return (
        <Text style={{color: '#6C63FF'}} category='h6'>{text}</Text>
    )
}