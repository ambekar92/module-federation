import { Role } from "@/app/shared/types/role";

type Permission = {
    id: number;
    slug: Role;
    name: string;
    description: string;
    parameters: string;
  };
  
  type Entity = {
    entity_id: number;
    type: string;
    structure: string;
    user_id: number;
  };
  
  export type LoginResponseUser = {
    user_id: number;
    permissions: Permission[];
    entities: Entity[];
    refresh: string;
    access: string;
  };
  
  export type LoginResponse = {
    message: string;
    user: LoginResponseUser;
  };