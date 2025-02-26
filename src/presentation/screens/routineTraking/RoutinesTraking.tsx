import { MainLayout } from "../../layouts/MainLayout"
import { useAuthStore } from "../../hooks/useLogin";
import { ListRoutinesTraking } from "../../components/routineTraking/ListRoutinesTraking";

export const RoutinesTrakingScreen = () => {
    const { logout } = useAuthStore();
    return (
        <MainLayout title="Rutinas" subTitle="Rutinas realizadas" rightActionIcon="log-out-outline" rightAction={logout}>
            <ListRoutinesTraking/>
        </MainLayout>
    )
}