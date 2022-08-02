import { Test, TestingModule } from '@nestjs/testing';
import { ProjectController } from '../../project/project.controller';
import { ProjectService } from '../../project/project.service';
import { createProjectDtoMock } from '../mocks/dto/create-project.dto';
import { ProjectServiceMock } from '../mocks/services/project.service.mock';

describe('ProjectController', () => {
  let controller: ProjectController;
  let projectService: ProjectServiceMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectController],
      providers: [{ provide: ProjectService, useClass: ProjectServiceMock }],
    }).compile();

    controller = module.get<ProjectController>(ProjectController);
    projectService = module.get(ProjectService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe(':id', () => {
    it('should call projectService findProjectByid method', () => {
      controller.getProject('1');

      expect(projectService.findProjectById).toHaveBeenCalledWith('1');
    });
  });

  describe('/create', () => {
    it('should call projectService creatProject method', () => {
      controller.createProject(createProjectDtoMock);

      expect(projectService.createProject).toHaveBeenCalledWith(
        createProjectDtoMock,
      );
    });
  });
});
