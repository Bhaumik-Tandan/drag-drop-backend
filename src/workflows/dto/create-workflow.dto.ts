import { IsString, IsNotEmpty, IsArray, ValidateNested, IsObject, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export interface WorkflowComponent {
  id: string;
  title: string;
  type: string;
  color: string;
  icon: string;
  position: { x: number; y: number };
  config: Record<string, any>;
}

export interface WorkflowConnection {
  id: string;
  from: string;
  fromType: string;
  to: string;
  toType: string;
}

export class CreateWorkflowDto {
  @IsString() @IsNotEmpty()
  name: string;

  @IsArray() @ValidateNested({ each: true }) @Type(() => Object)
  components: WorkflowComponent[];

  @IsArray() @ValidateNested({ each: true }) @Type(() => Object)
  connections: WorkflowConnection[];

  @IsObject() @IsOptional()
  configurations?: Record<string, any>;
}
