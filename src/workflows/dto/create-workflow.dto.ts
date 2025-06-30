// src/workflows/dto/create-workflow.dto.ts
import {
  IsString,
  IsNotEmpty,
  IsArray,
  ValidateNested,
  IsObject,
  IsOptional,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Prisma } from 'generated/prisma';


class PositionDto {
  @IsNumber() x: number;
  @IsNumber() y: number;
}

export class WorkflowComponentDto {
  @IsString() id: string;
  @IsString() title: string;
  @IsString() type: string;
  @IsString() color: string;
  @IsString() icon: string;

  @ValidateNested() @Type(() => PositionDto)
  position: PositionDto;

  @IsObject()
  config: Prisma.InputJsonValue;
}

export class WorkflowConnectionDto {
  @IsString() id: string;
  @IsString() from: string;
  @IsString() fromType: string;
  @IsString() to: string;
  @IsString() toType: string;
}

export class CreateWorkflowDto {
  @IsString() @IsNotEmpty()
  name: string;

  @IsArray() @ValidateNested({ each: true }) @Type(() => WorkflowComponentDto)
  components: WorkflowComponentDto[] & Prisma.InputJsonValue;

  @IsArray() @ValidateNested({ each: true }) @Type(() => WorkflowConnectionDto)
  connections: WorkflowConnectionDto[] & Prisma.InputJsonValue;

  @IsOptional() @IsObject()
  configurations?: Prisma.InputJsonValue;
}
