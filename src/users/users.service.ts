import { Injectable, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { db } from '../database/drizzle.js';
import { users } from '../database/schema.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { eq } from 'drizzle-orm';

@Injectable()
export class UsersService {
    async create(createUserDto: CreateUserDto) {
        const hashedPassword = await bcrypt.hash(
            createUserDto.password,
            10,
        );

        const [user] = await db
            .insert(users)
            .values({
                name: createUserDto.name,
                email: createUserDto.email,
                password: hashedPassword,
                role: createUserDto.role,
            })
            .returning();

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        };
    }
    async findByEmail(email: string) {
        const [user] = await db
            .select()
            .from(users)
            .where(eq(users.email, email));

        return user;
    }
    async changePassword(
  userId: number,
  currentPassword: string,
  newPassword: string,
) {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, userId));

  const passwordMatch = await bcrypt.compare(
    currentPassword,
    user.password,
  );

  if (!passwordMatch) {
    throw new BadRequestException(
      'La contraseña actual es incorrecta',
    );
  }

  const hashedPassword = await bcrypt.hash(
    newPassword,
    10,
  );

  await db
    .update(users)
    .set({
      password: hashedPassword,
      mustChangePassword: false,
    })
    .where(eq(users.id, userId));

  return {
    message: 'Contraseña actualizada correctamente',
  };
}
}