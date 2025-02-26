import {
    LineChart
  } from "react-native-chart-kit";

import { useAuthStore } from "../../hooks/useLogin";
import { MainLayout } from "../../layouts/MainLayout"
import { Dimensions } from "react-native";
import { Layout } from "@ui-kitten/components";
import { useDashBoardData } from "../../hooks/useDashBoard";

export const DashBoardScreen = () => {
    const { logout } = useAuthStore();
    
    const { countBack, countBiceps, countDeltoide, countLeg, countPecho, countTriceps } = useDashBoardData();

    
    return (
        <MainLayout title="Estadisticas" subTitle="" rightActionIcon="log-out-outline" rightAction={logout}>
            <Layout style={{ marginHorizontal: 10, marginTop: 20 }}>
                <LineChart
                    data={{
                        labels: ["Pecho", "Espalda", "Pierna", "Bicep", "Tricep", "Hombro"],
                        datasets: [
                            {
                                data: [
                                    countPecho.length,
                                    countBack.length,
                                    countLeg.length,
                                    countBiceps.length,
                                    countTriceps.length,
                                    countDeltoide.length,
                                ]
                            }
                        ]
                    }}
                    width={Dimensions.get("window").width-20} // from react-native
                    height={250}
                    yAxisInterval={1} // optional, defaults to 1
                    chartConfig={{
                        backgroundColor: "#8f75bf",
                        backgroundGradientFrom: "#9884bb",
                        backgroundGradientTo: "#9f90ba",
                        decimalPlaces: 0, 
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: {
                            borderRadius: 16
                        },
                        propsForDots: {
                            r: "6",
                            strokeWidth: "2",
                            stroke: "#ffa726"
                        }
                    }}
                    bezier
                    style={{
                        marginVertical: 8,
                        borderRadius: 16
                    }}
                />
            </Layout>
        </MainLayout>
    )
}