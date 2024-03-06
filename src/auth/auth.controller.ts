import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, CreateUserDto, UpdateUserDto } from './dto';
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
  @Get('user-all')
  getUserAll() {
    return this.authService.getAllUsuarioIngreso();
  }

  @ApiBearerAuth()
  @Post('user')
  getUserUpdate(@Body() dt: UpdateUserDto,) {
    return this.authService.upsertElectricidadIngreso(dt);
  }

  @ApiBearerAuth()
  @Get('user/:id')
  getUserAllById(@Param('id') id: number) {
    return this.authService.getAllUsuarioIngresoById(id);
  }

  @ApiBearerAuth()
  @Get('user-info/:code')
  getUserInfo(
    @Param('code') code: string
  ) {
    return this.authService.getUserInfo(code);
  }

  @ApiBearerAuth()
  @Get('user-tienda/:code')
  getUserTienda(
    @Param('code') code: string
  ) {
    return this.authService.getUserTienda(code);
  }
  
}
