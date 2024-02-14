import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, CreateUserDto } from './dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from './guards/no-jwt.guard';

@ApiTags('Autenticacion')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signin')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  // @Public()
  @ApiBearerAuth()
  @Post('signup')
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @ApiBearerAuth()
  @Get('user-info/:code')
  getUserInfo(
    @Param('code') code: string
  ) {
    return this.authService.getUserInfo(code);
  }
}
