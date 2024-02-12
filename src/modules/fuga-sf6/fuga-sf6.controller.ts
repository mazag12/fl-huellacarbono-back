import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { FugaSf6Service } from './fuga-sf6.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import PaginationDto from 'src/common/dto/pagination.dto';
import { UpsertFugaSf6IngresoDto } from './dto/upsert-fuga-sf6-ingreso.dto';
import { UpsertFugaSf6TipoDto } from './dto/upsert-fuga-sf6-tipo.dto';
import { AuthUser } from 'src/auth/interfaces/auth-user.interface';
import { User } from 'src/auth/decorators/get-user.decorator';

@ApiBearerAuth()
@ApiTags('Fuga SF6')
@Controller('fuga-sf6')
export class FugaSf6Controller {
  constructor(private readonly fugaSf6Service: FugaSf6Service) {}

  @Post('ingreso')
  upsertFugaSf6Ingreso(
    @Body() dt: UpsertFugaSf6IngresoDto,
    @User() user: AuthUser
  ) {
    return this.fugaSf6Service.upsertFugaSf6Ingreso(dt, user);
  }

  @Get('ingreso')
  getAllFugaSf6Ingreso(@Query() pg: PaginationDto) {
    return this.fugaSf6Service.getAllFugaSf6Ingreso(pg);
  }

  @Get('tipo')
  getAllFugaSf6Tipo() {
    return this.fugaSf6Service.getAllFugaSf6Tipo();
  }

  @Post('tipo')
  upsertFugaSf6Tipo(@Body() dt: UpsertFugaSf6TipoDto) {
    return this.fugaSf6Service.upsertFugaSf6Tipo(dt);
  }

  @Delete('tipo/:id')
  deleteFugaSf6Tipo(@Param('id') id: number) {
    return this.fugaSf6Service.deleteFugaSf6Tipo(id);
  }
}
