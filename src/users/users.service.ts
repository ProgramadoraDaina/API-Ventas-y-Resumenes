import { Injectable, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { db } from '../database/drizzle';
import { users } from '../database/schema';
import { CreateUserDto } from './dto/create-user.dto';
import { eq } from 'drizzle-orm';

@Injectable()
export class UsersService {
  async create(createUserDto: CreateUserDto) {

    const existingUser =
      await this.findByEmail(
        createUserDto.email,
      );

    if (existingUser) {
      throw new BadRequestException(
        'Ya existe un usuario con ese email',
      );
    }
    
    const username =
      createUserDto.email.split('@')[0];

    const temporaryPassword =
      `${username}123`;

    const hashedPassword =
      await bcrypt.hash(
        temporaryPassword,
        10,
      );

    const [user] = await db
      .insert(users)
      .values({
        name: createUserDto.name,
        email: createUserDto.email,
        password: hashedPassword,
        role: createUserDto.role,
        mustChangePassword: true,
      })
      .returning();

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      temporaryPassword,
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

    const passwordMatch = await bcrypt.compare(
      currentPassword,
      user.password,);

    if (!passwordMatch) {
      throw new BadRequestException(
        'La contraseña actual es incorrecta',
      );
    }

    const hashedPassword = await bcrypt.hash(
      newPassword,
      10,
    );

    await db.update(users)
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