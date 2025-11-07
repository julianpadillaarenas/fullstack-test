import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../shared/services/prisma-client';
import { AuthorizationRequestRepository } from '../../domain/repositories/authorizationRequest.repository';
import { AuthorizationRequest, PrimitiveAuthorizationRequest } from '../../domain/entities/authorizationRequest';
import { AuthorizationRequestHistory } from '../../domain/entities/authorizationRequestHistory';

@Injectable()
export class PrismaAuthorizationRepository implements AuthorizationRequestRepository {
  constructor(private readonly prisma: PrismaService) {}

  private mapRowToPrimitive(row: any): PrimitiveAuthorizationRequest {
    return {
      id: row.id,
      title: row.title,
      description: row.description,
      requestingUserId: row.requestingUserId,
      responsibleUserId: row.responsibleUserId,
      typeOfRequest: (row.typeOfRequest as unknown) as any,
      status: (row.status as unknown) as any,
      history: (row.history ?? []).map((h: any) => ({
        id: h.id,
        authorizationRequestId: h.authorizationRequestId,
        status: h.status,
        date: h.date,
        actionUserId: h.actionUserId,
        commentary: h.commentary,
      })),
      createdAt: row.createdAt?.toISOString?.(),
      updatedAt: row.updatedAt?.toISOString?.(),
    } as PrimitiveAuthorizationRequest;
  }

  private primitiveToEntity(p: PrimitiveAuthorizationRequest): AuthorizationRequest {
    const entity = new AuthorizationRequest({
      id: p.id,
      title: p.title,
      description: p.description,
      requestingUserId: p.requestingUserId,
      responsibleUserId: p.responsibleUserId,
      typeOfRequest: p.typeOfRequest,
      status: p.status,
      history: p.history ?? [],
    });

    entity.history = (p.history ?? []).map((h) => new AuthorizationRequestHistory({
      id: h.id,
      authorizationRequestId: h.authorizationRequestId,
      status: h.status,
      date: h.date instanceof Date ? h.date : new Date(h.date as any),
      actionUserId: h.actionUserId,
      commentary: h.commentary,
    }));

    return entity;
  }

  async create(data: PrimitiveAuthorizationRequest): Promise<AuthorizationRequest> {
    const created = await this.prisma.authorizationRequest.create({
      data: {
        id: data.id,
        title: data.title,
        description: data.description,
        requestingUserId: data.requestingUserId,
        responsibleUserId: data.responsibleUserId,
        typeOfRequest: (data.typeOfRequest as any) ?? 'deployment',
        status: (data.status as any) ?? 'pending',
        history: {
          create: (data.history ?? []).map((h) => ({
            id: h.id,
            status: h.status,
            date: h.date ? new Date(h.date) : undefined,
            actionUserId: h.actionUserId,
            commentary: h.commentary,
          })),
        },
      },
      include: { history: true },
    });

    const primitive = this.mapRowToPrimitive(created);
    return this.primitiveToEntity(primitive);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.$transaction([
      this.prisma.authorizationRequestHistory.deleteMany({ where: { authorizationRequestId: id } }),
      this.prisma.authorizationRequest.delete({ where: { id } }),
    ]);
  }

  async findAll(): Promise<AuthorizationRequest[]> {
    const rows = await this.prisma.authorizationRequest.findMany({
      include: { history: true },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => this.primitiveToEntity(this.mapRowToPrimitive(r)));
  }

  async findAllByIdUser(userId: string): Promise<AuthorizationRequest[] | null> {
    const rows = await this.prisma.authorizationRequest.findMany({
      where: { requestingUserId: userId },
      include: { history: true },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => this.primitiveToEntity(this.mapRowToPrimitive(r)));
  }

  async findAllPendingByIdUser(userId: string): Promise<AuthorizationRequest[] | null> {
    const rows = await this.prisma.authorizationRequest.findMany({
      where: {
        status: 'pending',
        responsibleUserId: userId,
      },
      include: { history: true },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => this.primitiveToEntity(this.mapRowToPrimitive(r)));
  }

  async findById(id: string): Promise<AuthorizationRequest | null> {
    const row = await this.prisma.authorizationRequest.findUnique({
      where: { id },
      include: { history: true },
    });
    if (!row) return null;
    return this.primitiveToEntity(this.mapRowToPrimitive(row));
  }

  async update(
    requestId: string,
    data: Partial<Omit<PrimitiveAuthorizationRequest, 'id'>>
  ): Promise<AuthorizationRequest> {
    const filtered = Object.fromEntries(Object.entries(data).filter(([_, v]) => v !== undefined)) as Partial<Omit<PrimitiveAuthorizationRequest, 'id'>>;

    const requestUpdate: any = {};
    if (filtered.title !== undefined) requestUpdate.title = filtered.title;
    if (filtered.description !== undefined) requestUpdate.description = filtered.description;
    if (filtered.requestingUserId !== undefined) requestUpdate.requestingUserId = filtered.requestingUserId;
    if (filtered.responsibleUserId !== undefined) requestUpdate.responsibleUserId = filtered.responsibleUserId;
    if (filtered.typeOfRequest !== undefined) requestUpdate.typeOfRequest = filtered.typeOfRequest;
    if (filtered.status !== undefined) requestUpdate.status = filtered.status;

    const result = await this.prisma.$transaction(async (tx) => {
      const updated = await tx.authorizationRequest.update({
        where: { id: requestId },
        data: requestUpdate,
        include: { history: true },
      });

      if (Array.isArray((filtered as any).history) && (filtered as any).history.length > 0) {
        const existingIds = new Set(
          updated.history.map((h) => h.id)
        );

        const toCreate = (filtered as any).history
          .filter((h: any) => !existingIds.has(h.id))
          .map((h: any) => ({
            id: h.id, // mantener id si lo necesitas
            authorizationRequestId: requestId,
            status: h.status,
            date: h.date ? new Date(h.date) : undefined,
            actionUserId: h.actionUserId,
            commentary: h.commentary,
          }));

        if (toCreate.length > 0) {
          await tx.authorizationRequestHistory.createMany({ data: toCreate });
        }
      }

      // re-fetch with histories
      const reloaded = await tx.authorizationRequest.findUnique({
        where: { id: requestId },
        include: { history: true },
      });

      return reloaded!;
    });

    return this.primitiveToEntity(this.mapRowToPrimitive(result));
  }
}