interface IUser{
    id: number;
    email: string;
    userName: string;
    password: string;
    role?: string;
}

export default IUser