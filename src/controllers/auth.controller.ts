import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from '../services/auth/auth.service';
import { AuthCredentialsDto } from '../services/auth/dto/auth-credentials.dto';
import { CreateUserDto } from '../services/users/dto/create-user.dto';
import { User } from '../services/users/user.schema';
import { GetUser } from '../utils/decorators/get-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() createUserDto: CreateUserDto): Promise<void> {
    return this.authService.signUp(createUserDto);
  }

  @Post('/signin')
  signIn(
    @Body() createUserDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(createUserDto);
  }

  @Get('/test')
  Test(@GetUser() user: any) {
    console.log(user);
  }
}
