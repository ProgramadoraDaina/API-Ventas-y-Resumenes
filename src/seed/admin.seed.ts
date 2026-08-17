import { Injectable, OnModuleInit } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { db } from '../database/drizzle.js';
import { users } from '../database/schema.js';

import { eq } from 'drizzle-orm';

@Injectable()
export class AdminSeedService implements OnModuleInit {
  async onModuleInit() {
    const [admin] = await db
      .select()
      .from(users)
      .where(eq(users.role, 'admin'));

    if (admin) {
      console.log('✅ Ya existe un administrador');
      return;
    }

    const hashedPassword = await bcrypt.hash(
      'admin123',
      10,
    );

    await db.insert(users).values({
      name: 'Administrator',
      email: 'admin@restaurant.com',
      password: hashedPassword,
      role: 'admin',
      mustChangePassword: true,
    });

    console.log('🚀 Administrador inicial creado');
    console.log('📧 Email: admin@restaurant.com');
    console.log('🔑 Password: admin123');
  }
}