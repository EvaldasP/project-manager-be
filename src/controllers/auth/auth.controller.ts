import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../../auth/auth.service';
import { AuthCredentialsDto } from '../../auth/dto/auth-credentials.dto';
import { User } from '../../schemas/user.schema';
import { CreateUserDto } from '../../users/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() createUserDto: CreateUserDto): Promise<boolean> {
    return this.authService.signUp(createUserDto);
  }

  @Post('/signin')
  signIn(
    @Body() createUserDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(createUserDto);
  }
}
