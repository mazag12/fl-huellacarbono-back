import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import PaginationDto from 'src/common/dto/pagination.dto';
import { User } from './decorators/get-user.decorator';
import { AuthUser } from './interfaces/auth-user.interface';
import { PostAccesoDto } from './dto/post-acceso.dto';
import { PutAccesosDto } from './dto/put-acceso.dto';

@ApiBearerAuth()
@ApiTags('Administracion Usuarios & Accesos')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllUsuarios(@Query() pg: PaginationDto) {
    return this.userService.getAllUsuarios(pg);
  }

  @Get(':id')
  getUserAllById(@Param('id') id: number) {
    return this.userService.getAllUsuarioIngresoById(id);
  }

  @Post('acceso')
  postAcceso(@Body() dt: PostAccesoDto, @User() u: AuthUser) {
    return this.userService.postAcceso(dt, u);
  }

  @Put('acceso')
  updateActualizarAcceso(@User() u: AuthUser, @Body() dt: PutAccesosDto) {
      return this.userService.updateActualizarAcceso(dt, u);
  }

}
