import { Card } from "@ui-kitten/components"
import { ReactNode } from "react"

interface Props {
    children: ReactNode;
    onSelect?: () => void;
    isDisable?: boolean;
}

export const MyCard = ({children, onSelect, isDisable = false}: Props) => {
    return (
        <Card 
            style={{
                margin: 10,
                elevation: 5,
                borderRadius: 20
            }}
            disabled={isDisable}
            onPress={ onSelect && onSelect}
        > 
            {children}
        </Card>
    )
}
