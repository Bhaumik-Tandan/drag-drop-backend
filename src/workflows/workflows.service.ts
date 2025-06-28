// src/workflows/workflows.service.ts
import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWorkflowDto } from './dto/create-workflow.dto';
import { UpdateWorkflowDto } from './dto/update-workflow.dto';

@Injectable()
export class WorkflowsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: number, dto: CreateWorkflowDto) {
    return this.prisma.workflow.create({
      data: {
        name: dto.name,
        userId,
        components: dto.components,
        connections: dto.connections,
        configurations: dto.configurations,
      },
    });
  }

  async findAll(userId: number) {
    return this.prisma.workflow.findMany({
      where: { userId },
      orderBy: { updatedAt: 'desc' },
    });
  }

  async findOne(userId: number, id: number) {
    const wf = await this.prisma.workflow.findUnique({ where: { id } });
    if (!wf) throw new NotFoundException(`Workflow ${id} not found`);
    if (wf.userId !== userId) throw new ForbiddenException();
    return wf;
  }

  async update(userId: number, id: number, dto: UpdateWorkflowDto) {
    await this.findOne(userId, id);
    return this.prisma.workflow.update({
      where: { id },
      data: {
        ...(dto.name         !== undefined && { name: dto.name }),
        ...(dto.components   !== undefined && { components: dto.components }),
        ...(dto.connections  !== undefined && { connections: dto.connections }),
        ...(dto.configurations !== undefined && { configurations: dto.configurations }),
      },
    });
  }

  async remove(userId: number, id: number) {
    await this.findOne(userId, id);
    await this.prisma.workflow.delete({ where: { id } });
    return { deleted: true };
  }
}
