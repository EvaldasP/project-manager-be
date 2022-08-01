import { CreateProjectDto } from '../../../project/create-project.dto';

export const createProjectDtoMock: CreateProjectDto = {
  name: 'Test',
  projectManagerId: '123',
  workers: [],
  tasks: [],
};
