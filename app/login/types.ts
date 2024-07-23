import { Role } from "../shared/types/role";

type Permission = {
    id: number;
    slug: Role;
    name: string;
    description: string;
    parameters: string;
  };
  
  type User = {
    name: string;
    email: string;
    accessToken: string;
    okta_id: string;
    id: number;
  };
  
  type Data = {
    user: User;
    expires: string;
    csrfToken: string;
    user_id: number;
    permissions: Permission[];
    entities: any[]; 
    refresh: string;
    access: string;
  };
  
  export type SessionType = {
    data: Data;
    status: 'loading' | 'authenticated' | 'unauthenticated';
  };