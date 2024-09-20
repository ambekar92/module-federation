import { Role } from '../shared/types/role';

export type Permission = {
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

  type Entity = {
    entity_id: number;
    type: string;
    structure: string;
    user_id: number;
  }

  type Data = {
    user: User;
    expires: string;
    csrfToken: string;
    user_id: number;
    permissions: Permission[];
    entities: Entity[];
    refresh: string;
    access: string;
  };

export type SessionType = {
    data: Data;
    status: 'loading' | 'authenticated' | 'unauthenticated';
  };
