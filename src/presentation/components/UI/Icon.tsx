import { IconElement, Icon } from "@ui-kitten/components";
import { StyleSheet } from 'react-native';

interface Props {
    name: string;
    size?: {width: number, height: number};
}

export const IconUI = ({name, size = { width: 32, height: 32 }}: Props): IconElement => {
    return (
        <Icon
            style={{
                width: size.width,
                height: size.height,
              }}
            name={name}
        />
    )
}