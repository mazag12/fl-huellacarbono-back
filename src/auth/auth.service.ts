import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { LoginDto, CreateUserDto } from './dto';
import { AuthUser } from './interfaces/auth-user.interface';
import { DataSource, Repository } from 'typeorm';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User, 'DEV')
    private readonly userRepository: Repository<User>,

    @InjectDataSource('DEV')
    private readonly DEV: DataSource,

    private jwtService: JwtService,
  ) {}

  async register(dto: CreateUserDto) {
    const { password, ...userData } = dto;
    const user = await this.userRepository.save({ ...userData, password: bcrypt.hashSync(password, 10)});
    delete user.password;
    return user;
  }

  async login(loginDto: LoginDto) {
    const { code, password } = loginDto;

    const user = await this.userRepository.findOne({
      where: { code },
      select: ['id', 'code', 'email', 'nombre', 'apellido', 'password', 'isActive', 'role'],
    });
    if (!user) throw new UnauthorizedException('Credenciales invalidas, codigo inexistente');
    if (!user.isActive) throw new UnauthorizedException('El usuario no esta activo');
    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Contraseña incorrecta');

    return await this.getJwtToken(user);
  }

  getJwtToken = ({ id, email, nombre, apellido, code, role }) => 
    this.jwtService.signAsync({ sub: +id, email, nombre, apellido, code, role })

  getUserInfo = (code: string) => this.DEV.query(`SELECT p.CODIGO as code
        , p.NOMBRE as nombre
        , p.PATERNO as apepat
        , p.MATERNO as apemat
        , p.NUMERODOCUMENTO AS dni
        , RTRIM(tcc.cencos_id) as ceco_id
        , tcc.cencosname AS ceco_nombre
        , tcc.Serie_pllagtos as ceco_serie
      FROM PERSONA AS P WITH (NOLOCK)
      INNER JOIN [SRV252].[bapEmpresa01].[dbo].[tb_centrocosto] AS tcc WITH(NOLOCK) ON tcc.cencosid COLLATE Modern_Spanish_CI_AS = p.AREA
      WHERE p.FechaBaja = '' AND p.CODIGO = '${code}'`);
}