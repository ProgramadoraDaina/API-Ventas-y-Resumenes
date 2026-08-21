import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { db } from '../database/drizzle';
import { users } from '../database/schema';
import { CreateUserDto } from './dto/create-user.dto';
import { eq } from 'drizzle-orm';

@Injectable()
export class UsersService {
  async create(createUserDto: CreateUserDto) {

    const _existingUser =
      await this.findByEmail(
        createUserDto.email,
      );

    if (_existingUser) {
      throw new BadRequestException(
        'Ya existe un usuario con ese email',
      );
    }

    const _username =
      createUserDto.email.split('@')[0];

    const _temporaryPassword =
      `${_username}123`;

    const _hashedPassword =
      await bcrypt.hash(
        _temporaryPassword,
        10,
      );
    const [user] = await db
      .insert(users)
      .values({
        name: createUserDto.name,
        email: createUserDto.email,
        password: _hashedPassword,
        role: createUserDto.role,
        mustChangePassword: true,
      })
      .returning();

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      temporaryPassword: _temporaryPassword,
    };
  }

  async findByEmail(email: string) {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    return user;
  }

  async changePassword(userId: number, currentPassword: string, newPassword: string,) {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, userId));

    if (!user) {
      throw new NotFoundException(
        'Usuario no encontrado',
      );
    }
    const _passwordMatch = await bcrypt.compare(
      currentPassword,
      user.password,);

    if (!_passwordMatch) {
      throw new BadRequestException(
        'La contraseña actual es incorrecta',
      );
    }

    const _hashedPassword = await bcrypt.hash(
      newPassword,
      10,
    );

    await db.update(users)
      .set({
        password: _hashedPassword,
        mustChangePassword: false,
      })
      .where(eq(users.id, userId));
    return {
      message: 'Contraseña actualizada correctamente',
    };
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
}