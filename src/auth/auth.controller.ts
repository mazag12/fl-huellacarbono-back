import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, CreateUsuarioDto, UpdateUserDto } from './dto';
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

  @Public()
  @Get(':code')
  getUserInfo(
    @Param('code') code: string
  ) {
    return this.authService.getinfo(code);
  }
  
  @Public()
  @Post('password-recovery')
  postRecuperarContrasena(){
    this.authService.postRecuperarContrasena();
  }

  // @Public()
  @ApiBearerAuth()
  @Post('signup')
  register(@Body() createUserDto: CreateUsuarioDto) {
    return this.authService.register(createUserDto);
  }
  
}
