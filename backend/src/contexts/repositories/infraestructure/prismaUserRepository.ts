// src/modules/user/repositories/prisma-user.repository.ts
import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository';
import { PrismaService } from '../../shared/services/prisma-client';
import { PrimitiveUser, User } from '../../domain/entities/user';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  private rowToPrimitive(row: any): PrimitiveUser {
    return {
      id: row.id,
      name: row.name,
      email: row.email,
    };
  }

  async findAll(): Promise<User[]> {
    const rows = await this.prisma.user.findMany({ orderBy: { name: 'asc' } });
    return rows.map((r) => User.createFromPrimitives(this.rowToPrimitive(r)));
  }

  async findById(userId: string): Promise<User | null> {
    const row = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!row) return null;
    return User.createFromPrimitives(this.rowToPrimitive(row));
  }

  async create(data: PrimitiveUser): Promise<User> {
    const row = await this.prisma.user.create({
      data: {
        id: data.id,
        name: data.name,
        email: data.email,
      },
    });
    return User.createFromPrimitives(this.rowToPrimitive(row));
  }
}
