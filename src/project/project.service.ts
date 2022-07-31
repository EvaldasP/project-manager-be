import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProjectDto } from './create-project.dto';
import { Project, ProjectDocument } from './project.schema';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name)
    private readonly projectModel: Model<ProjectDocument>,
  ) {}

  async createProject(createProjectDto: CreateProjectDto): Promise<Project> {
    const createdProject = new this.projectModel({
      ...createProjectDto,
      tasks: [],
      workers: [],
      projectManager: null,
    });

    return createdProject.save();
  }
}
