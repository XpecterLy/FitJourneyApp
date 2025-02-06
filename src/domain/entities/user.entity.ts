export interface UserEntity {
    id:       string;
    username: string;
    email:    string;
    rol:      string;
};

export interface AuthEntity {
    token: string;
    user: UserEntity; 
};