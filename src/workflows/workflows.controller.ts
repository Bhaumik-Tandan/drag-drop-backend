// src/workflows/workflows.controller.ts
import {
  Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe,
  UseGuards, Request
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { WorkflowsService } from './workflows.service';
import { CreateWorkflowDto } from './dto/create-workflow.dto';
import { UpdateWorkflowDto } from './dto/update-workflow.dto';

@UseGuards(JwtAuthGuard)
@Controller('workflows')
export class WorkflowsController {
  constructor(private readonly svc: WorkflowsService) {}

  @Post()
  create(
    @Body() dto: CreateWorkflowDto,
    @Request() req,                   
  ) {
    return this.svc.create(req.user.id, dto);
  }

  @Get()
  findAll(@Request() req) {
    return this.svc.findAll(req.user.id);
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @Request() req,
  ) {
    return this.svc.findOne(req.user.id, id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateWorkflowDto,
    @Request() req,
  ) {
    return this.svc.update(req.user.id, id, dto);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Request() req,
  ) {
    return this.svc.remove(req.user.id, id);
  }

  @Post('validate')
  validate(@Body() dto: CreateWorkflowDto) {
    return this.svc.validate(dto);
  }
}
