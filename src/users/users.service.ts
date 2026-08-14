import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { db } from '../database/drizzle.js';
import { users } from '../database/schema.js';
import { CreateUserDto } from './dto/create-user.dto.js';

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
}