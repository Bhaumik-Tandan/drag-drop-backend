// src/workflows/workflows.service.ts
import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWorkflowDto } from './dto/create-workflow.dto';
import { UpdateWorkflowDto } from './dto/update-workflow.dto';
import { Prisma } from 'generated/prisma';

@Injectable()
export class WorkflowsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: number, dto: CreateWorkflowDto) {
    return this.prisma.workflow.create({
      data: {
        name: dto.name,
        userId,
        components: dto.components as Prisma.InputJsonValue,
        connections: dto.connections as Prisma.InputJsonValue,
        configurations: dto.configurations as Prisma.InputJsonValue,
      },
    });
  }

  async findAll(userId: number) {
    if(!userId) 
      throw new ForbiddenException('User ID is required');
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
        ...(dto.components   !== undefined && { components: dto.components as Prisma.InputJsonValue }),
        ...(dto.connections  !== undefined && { connections: dto.connections as Prisma.InputJsonValue }),
        ...(dto.configurations !== undefined && { configurations: dto.configurations as Prisma.InputJsonValue }),
      },
    });
  }

  async remove(userId: number, id: number) {
    await this.findOne(userId, id);
    await this.prisma.workflow.delete({ where: { id } });
    return { deleted: true };
  }

  async validate(dto: CreateWorkflowDto) {
    // Basic validation: check required fields
    if (!dto.name) return { valid: false, error: 'Name is required' };
    if (!Array.isArray(dto.components) || dto.components.length === 0)
      return { valid: false, error: 'At least one component is required' };
    if (!Array.isArray(dto.connections))
      return { valid: false, error: 'Connections must be an array' };
    if (!dto.configurations)
      return { valid: false, error: 'Configurations are required' };

    const ids = dto.components.map(c => c.id);
    const uniqueIds = new Set(ids);
    if (ids.length !== uniqueIds.size) {
      return { valid: false, error: 'Duplicate component IDs found' };
    }

    // Check all components have required fields
    for (const c of dto.components) {
      if (!c.id || !c.title || !c.type || !c.position || !c.config) {
        return { valid: false, error: `Component with id ${c.id} is missing required fields` };
      }
    }

    // Check all connections refer to valid component IDs
    for (const conn of dto.connections) {
      if (!ids.includes(conn.from)) {
        return { valid: false, error: `Connection from invalid component id: ${conn.from}` };
      }
      if (!ids.includes(conn.to)) {
        return { valid: false, error: `Connection to invalid component id: ${conn.to}` };
      }
    }

    // Passed all checks
    return { valid: true };
  }
}
