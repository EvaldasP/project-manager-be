import { Body, Controller, Post } from '@nestjs/common';
import { AuthCredentialsDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() createUserDto: AuthCredentialsDto): Promise<void> {
    return this.authService.singUp(createUserDto);
  }

  @Post('/signin')
  signIn(
    @Body() createUserDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(createUserDto);
  }
}
