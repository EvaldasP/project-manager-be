import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersService } from '../users/users.service';
import { CreateProjectDto } from './create-project.dto';
import { Project, ProjectDocument } from './project.schema';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name)
    private readonly projectModel: Model<ProjectDocument>,
    private readonly usersService: UsersService,
  ) {}

  async createProject(createProjectDto: CreateProjectDto): Promise<Project> {
    const { name, projectManagerId } = createProjectDto;

    if (await this.findProject(name)) {
      throw new ConflictException(`Project with name ${name} already exists`);
    }

    const foundProjectManager = await this.usersService.getUserById(
      projectManagerId,
    );

    const createdProject = await this.projectModel.create({
      ...createProjectDto,
      tasks: [],
      workers: [],
      projectManager: foundProjectManager
        ? {
            _id: foundProjectManager._id,
            username: foundProjectManager.username,
          }
        : null,
    });

    return createdProject;
  }

  async findProject(name: string): Promise<Project> {
    return this.projectModel.findOne({ name });
  }

  async findProjectById(_id: string): Promise<Project> {
    const foundProject = await this.projectModel.findOne({ _id });

    if (!foundProject) {
      throw new NotFoundException('Project not found');
    }

    return foundProject;
  }
}
