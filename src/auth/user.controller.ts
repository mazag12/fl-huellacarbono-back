import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import PaginationDto from 'src/common/dto/pagination.dto';
import { User } from './decorators/get-user.decorator';
import { AuthUser } from './interfaces/auth-user.interface';
import { PostAccesoDto } from './dto/post-acceso.dto';

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

  @Delete('acceso')
  deleteAcceso(@Query('acceso_id') acceso_id: number, @User() u: AuthUser) {
      return this.userService.deleteAcceso(acceso_id, u);
  }

}
