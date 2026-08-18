import { UserRole } from '../../users/enums/user-role.enum';

export interface AuthUser {
  id: number;
  email: string;
  role: UserRole;
}