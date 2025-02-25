import { isAxiosError } from "axios";
import { msUserApi, msUserHost } from "../config/api/msUser.api.config"
import { UserType } from "../domain/entities/user.type"
import { ResponseUser } from "../infrastructure/interfaces/userInterface"

export class msUser {
    static registerUser = async (dataUser: UserType) => {
        const {data} = await msUserApi.post<ResponseUser>('/', dataUser);
        return data;
    }
}