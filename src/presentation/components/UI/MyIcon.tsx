import { IconElement, Icon } from "@ui-kitten/components";

interface Props {
    name: string;
    size?: {width: number, height: number};
    color?: string;
}

export const MyIcon = ({name, size = { width: 32, height: 32 }, color}: Props): IconElement => {
    return (
        <Icon
            fill={ color }
            style={{
                width: size.width,
                height: size.height,
              }}
            name={name}
        />
    )
}