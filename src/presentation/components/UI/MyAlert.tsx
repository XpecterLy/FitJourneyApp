import { Alert } from "react-native";

interface Props {
    title?: string;
    subTitle?: string;
    onSelectOk?: () => void;
}

export const MyAlert = ({title = '', subTitle = '', onSelectOk}: Props) =>
  Alert.alert(title, subTitle, [
    {
      text: 'Cancelar',
      style: 'cancel',
    },
    {
      text: 'OK', 
      onPress: onSelectOk && onSelectOk
    },
  ]);