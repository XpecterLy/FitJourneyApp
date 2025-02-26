import { create } from 'zustand';
import { UserEntity } from '../../domain/entities/user.entity';
import { AuthStatusInterface } from '../../infrastructure/interfaces/authInteface';
import { msAuth } from '../../api/msAuth';
import { storageAdapter } from '../../config/adapter/storage-adapter';

interface AuthState {
    status: AuthStatusInterface,
    token?: string;
    user?: UserEntity,

    login: (username: string, password: string) => Promise<boolean>;
    checkStatus: () => Promise<void>;
    logout: () => Promise<void>;
}
  
export const useAuthStore = create<AuthState>()((set, get) => ({
    status: 'checking',
    token: undefined,
    user: undefined,

    login: async (username: string, password: string) => {
        const res = await msAuth.authUser(username, password);

        if(!res) {
            set({ status: 'unauthenticated', token: undefined, user: undefined });
            return false;
        }

        await storageAdapter.setStorage('token', res.token);
        set({ status: 'authenticated', token: res.token, user: res.user });
        return true;
    },

    checkStatus: async () => {
        const res = await msAuth.checkTokenAuth();
        if(!res) {
            set({ status: 'unauthenticated', token: undefined, user: undefined });
            return;
        }
        
        await storageAdapter.setStorage('token', res.token);
        set({ status: 'authenticated', token: res.token, user: res.user });
        return;
    },

    logout: async () => {
        await storageAdapter.removeStorage('token');
        set({status: "unauthenticated"});
        return;
    }
}))