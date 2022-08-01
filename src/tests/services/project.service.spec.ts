import { ConflictException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { rejects } from 'assert';
import { Model } from 'mongoose';
import { Project } from '../../project/project.schema';
import { ProjectService } from '../../project/project.service';
import { UsersService } from '../../users/users.service';
import { createProjectDtoMock } from '../mocks/dto/create-project.dto';
import { UsersServiceMock } from '../mocks/services/users.service.mock';
import { mockProject } from '../mocks/shared/project.mock';

describe('ProjectService', () => {
  let service: ProjectService;
  let usersService: UsersServiceMock;
  let model: Model<Project>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectService,
        { provide: UsersService, useClass: UsersServiceMock },
        {
          provide: getModelToken('Project'),
          useValue: {
            new: jest.fn().mockResolvedValue(mockProject),
            constructor: jest.fn().mockResolvedValue(mockProject),
            findOne: jest.fn(),
            create: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ProjectService>(ProjectService);
    model = module.get<Model<Project>>(getModelToken('Project'));
    usersService = module.get(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findProject', () => {
    it('should return project', async () => {
      jest.spyOn(model, 'findOne').mockReturnValue(mockProject as any);

      const foundProject = await service.findProject('Test');

      expect(foundProject).toEqual(mockProject);
    });
  });

  describe('createProject', () => {
    it('should create new project', async () => {
      jest.spyOn(model, 'create').mockImplementationOnce(() =>
        Promise.resolve({
          name: 'TestProject',
          projectManager: { _id: '123', username: 'TestManager' },
          tasks: [],
          workers: [],
        }),
      );

      const newProject = await service.createProject(createProjectDtoMock);

      expect(newProject).toEqual(mockProject);
    });

    it('should throw error if project already exist', async () => {
      jest.spyOn(service, 'findProject').mockResolvedValue(mockProject);

      expect(service.createProject(createProjectDtoMock)).rejects.toThrow(
        new ConflictException(`Project with name Test already exists`),
      );
    });
  });
});
