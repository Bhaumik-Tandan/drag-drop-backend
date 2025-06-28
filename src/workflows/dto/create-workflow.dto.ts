import { IsString, IsNotEmpty, IsJSON, IsOptional } from 'class-validator';

export class CreateWorkflowDto {
  @IsString() @IsNotEmpty()
  name: string;

  @IsJSON()
  components: any;

  @IsJSON()
  connections: any;

  @IsJSON() @IsOptional()
  configurations?: any;
}
