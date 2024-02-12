import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { PapelService } from './papel.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import PaginationDto from 'src/common/dto/pagination.dto';
import { UpsertPapelIngresoDto } from './dto/upsert-papel-ingreso.dto';
import { UpsertPapelTipoDto } from './dto/upsert-papel-tipo.dto';
import { AuthUser } from 'src/auth/interfaces/auth-user.interface';
import { User } from 'src/auth/decorators/get-user.decorator';

@ApiBearerAuth()
@ApiTags('Papel')
@Controller('papel')
export class PapelController {
  constructor(private readonly papelService: PapelService) {}

  @Post('ingreso')
  upsertPapelIngreso(
    @Body() dt: UpsertPapelIngresoDto,
    @User() user: AuthUser
  ) {
    return this.papelService.upsertPapelIngreso(dt, user);
  }

  @Get('ingreso')
  getAllPapelIngreso(@Query() pg: PaginationDto) {
    return this.papelService.getAllPapelIngreso(pg);
  }

  @Get('tipo')
  getAllPapelTipo() {
    return this.papelService.getAllPapelTipo();
  }

  @Post('tipo')
  upsertPapelTipo(@Body() dt: UpsertPapelTipoDto) {
    return this.papelService.upsertPapelTipo(dt);
  }

  @Delete('tipo/:id')
  deletePapelTipo(@Param('id') id: number) {
    return this.papelService.deletePapelTipo(id);
  }
}
