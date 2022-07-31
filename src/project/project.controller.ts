import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SuperAdminGuard } from '../common/guards/superAdmin.guard';
import { CreateProjectDto } from './create-project.dto';
import { Project } from './project.schema';
import { ProjectService } from './project.service';

@Controller('project')
@UseGuards(AuthGuard(), SuperAdminGuard)
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post('/create')
  createProject(@Body() createProjectDto: CreateProjectDto): Promise<Project> {
    return this.projectService.createProject(createProjectDto);
  }
}
