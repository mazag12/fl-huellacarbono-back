import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RefrigeranteIngreso } from './entities/refrigerante-ingreso.entity';
import { RefrigeranteTipo } from './entities/refrigerante-tipo.entity';
import { RefrigeranteEquipo } from './entities/refrigerante-equipo.entity';

@Injectable()
export class RefrigeranteService {

    constructor(

        @InjectRepository(RefrigeranteIngreso, 'PROD')
        private readonly refrigeranteIngresoRepo: RefrigeranteIngreso,

        @InjectRepository(RefrigeranteTipo, 'PROD')
        private readonly refrigeranteTipoRepo: RefrigeranteTipo,

        @InjectRepository(RefrigeranteEquipo, 'PROD')
        private readonly refrigeranteEquipoRepo: RefrigeranteEquipo,

    ) {}

    
    
}
