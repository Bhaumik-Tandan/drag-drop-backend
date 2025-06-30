import { WorkflowComponentDto,WorkflowConnectionDto} from '../dto/create-workflow.dto';

export class Workflow {
  id: number;
  name: string;
  userId: number;
  components: WorkflowComponentDto[];
  connections: WorkflowConnectionDto[];
  configurations?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}
