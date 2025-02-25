export interface ResponseUser {
    id: string;
    username: string;
    email:    string;
    password: string;
    rol:      'user' | 'admin';
}
