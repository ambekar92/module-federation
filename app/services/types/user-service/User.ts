export type User = {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    is_staff: boolean;
    is_superuser: boolean;
    is_active: boolean;
    last_login: null | string;
    date_joined: string;
    prbac_role: null;
};
