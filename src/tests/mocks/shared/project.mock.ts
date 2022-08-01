import { Project } from '../../../project/project.schema';

export const mockProject: Project = {
  name: 'TestProject',
  projectManager: { _id: '123', username: 'TestManager' },
  tasks: [],
  workers: [],
};
