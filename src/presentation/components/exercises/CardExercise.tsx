import { Image, StyleSheet } from "react-native";
import { MyCard } from "../UI/MyCards"
import { Layout, Text } from "@ui-kitten/components";

interface Props {
    image: string;
    name: string;
    series: number;
    onSelect?: () => void;
}

export const CardExercise = ({image, name, series, onSelect}: Props) => {
    return (
        <MyCard
            onSelect={ onSelect }
        > 
            <Layout >
                <Image
                    source={{
                        uri: image,
                    }}
                    style={styles.image}
                />            
            </Layout>
            <Layout style={{ flexDirection: 'row', marginTop: 15 }}>
                <Layout  style={{width: '60%'}}>
                    <Text style={{fontSize: 17, width: '100%'}} numberOfLines={2}>{name}</Text>
                </Layout>
                <Layout style={{width: '20%', alignItems: 'center'}}>
                    <Text category="c1" style={{color: '#6C63FF', fontSize: 15}}>Series</Text>
                    <Text category="p1" style={{color: '#6C63FF', fontSize: 25}}>{series}</Text>
                </Layout>
            </Layout>
        </MyCard>
    )
} 

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    image: {
      width: '100%',
      height: 200,
    },
});