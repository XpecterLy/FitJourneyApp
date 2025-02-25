import { Button, Text } from "@ui-kitten/components";

interface Props {
    text: string;
    isDisable?: boolean;
    appearance?: 'filled' | 'outline' | 'ghost'; 
    status?: 'basic' | 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'control';
    size?: 'tiny' | 'small' | 'medium' | 'large' | 'giant';

    onSelect?: () => void;
}

export const MyButton = ({
    text,
    isDisable = false,
    appearance = 'filled',
    status = 'primary',
    size = 'tiny',
    onSelect = () => {}
}: Props) => {
    return (
        <Button
            disabled={isDisable}
            appearance={appearance}
            status={status}
            size={size}
            onPress={onSelect}
            style={{width: '70%', backgroundColor: '#6C63FF', borderRadius: 10, borderColor: '#6C63FF'}}
        >
            <Text>{text}</Text>
        </Button>
    )
}