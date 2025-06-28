import { WorkflowComponent, WorkflowConnection } from '../dto/create-workflow.dto';

export class Workflow {
  id: number;
  name: string;
  userId: number;
  components: WorkflowComponent[];
  connections: WorkflowConnection[];
  configurations?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}
