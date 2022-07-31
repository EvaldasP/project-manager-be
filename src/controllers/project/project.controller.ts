import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SuperAdminGuard } from '../../utils/guards/superAdmin.guard';

@Controller('project')
@UseGuards(AuthGuard(), SuperAdminGuard)
export class ProjectController {
  @Get('/create')
  signUp(): void {
    console.log('test');
  }
}
