import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { db } from '../database/drizzle';
import { users } from '../database/schema';
import { eq } from 'drizzle-orm';
import { UserRole } from './enums/user-role.enum';

@Injectable()
export class UsersService {
 
  async findByEmail(email: string) {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    return user;
  }

  async updateRefreshToken(
    userId: number,
    hashedRefreshToken: string | null,
  ) {
    await db
      .update(users)
      .set({
        hashedRefreshToken,
      })
      .where(eq(users.id, userId));
  }
  async findByIdWithRefreshToken(
    id: number,
  ) {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, id));

    return user;
  }
  async updateRole(
  userId: number,
  role: UserRole,
) {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, userId));

  if (!user) {
    throw new NotFoundException(
      'Usuario no encontrado',
    );
  }

  if (user.role === UserRole.ADMIN) {
    throw new BadRequestException(
      'No se puede modificar el rol de otro administrador',
    );
  }

  const [updatedUser] = await db
    .update(users)
    .set({
      role,
    })
    .where(eq(users.id, userId))
    .returning();

  return {
    id: updatedUser.id,
    name: updatedUser.name,
    email: updatedUser.email,
    role: updatedUser.role,
  };
}
}