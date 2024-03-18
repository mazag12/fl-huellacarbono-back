import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, CreateUsuarioDto, UpdateUserDto, PasswordReset } from './dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from './guards/no-jwt.guard';
import { SendMail } from './dto/sendmail.dto';

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
  postRecuperarContrasena(@Body() mail: SendMail ){
    return this.authService.postRecuperarContrasena(mail);
  }


  @Public()
  //@ApiBearerAuth()
  @Post('signup')
  register(@Body() password: PasswordReset) {
    return this.authService.PostResetPassword(password);
  }
  

  //@Public()
  @ApiBearerAuth()
  @Post('ingreso')
  postUser(@Body() dto: CreateUsuarioDto) {
    return this.authService.upsertUser(dto);
  }

}
