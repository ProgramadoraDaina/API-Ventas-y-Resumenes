import { UserRole } from '../../users/enums/user-role.enum.js';

export interface AuthUser {
  id: number;
  email: string;
  role: UserRole;
}