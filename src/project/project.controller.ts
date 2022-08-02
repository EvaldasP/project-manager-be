import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SuperAdminGuard } from '../common/guards/superAdmin.guard';
import { CreateProjectDto } from './create-project.dto';
import { Project } from './project.schema';
import { ProjectService } from './project.service';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get(':id')
  getProject(@Param('id') id: string): Promise<Project> {
    return this.projectService.findProjectById(id);
  }

  @UseGuards(AuthGuard(), SuperAdminGuard)
  @Post('/create')
  createProject(@Body() createProjectDto: CreateProjectDto): Promise<Project> {
    return this.projectService.createProject(createProjectDto);
  }
}
