import { Body, Controller, Post } from '@nestjs/common';
import { createUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() createUserDto: createUserDto): Promise<void> {
    return this.authService.singUp(createUserDto);
  }
}
