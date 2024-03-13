import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { LoginDto, CreateUsuarioDto, UpdateUserDto } from './dto';
import { AuthUser } from './interfaces/auth-user.interface';
import { DataSource, Repository } from 'typeorm';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { MailService } from '../modules/mail/mail.service';
import { sendEmail } from './interfaces/sendEmail';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User, 'DEV')
    private readonly userRepository: Repository<User>,

    @InjectDataSource('DEV')
    private readonly DEV: DataSource,
    
    private readonly mailService: MailService,
    private readonly jwtService: JwtService,
  ) {}

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

  async getinfo(code: string){
    const user = await this.userRepository.findOne({
      where: { code },
      select: ['id', 'code', 'email', 'nombre', 'apellido', 'isActive'],
    });
    if (!user) throw new UnauthorizedException('Credenciales invalidas, codigo inexistente');
    if (!user.isActive) throw new UnauthorizedException('El usuario no esta activo');
    return user;
  }

  async postRecuperarContrasena(user: sendEmail){
    await this.mailService.sendEmailExample(user);
    return { message: "Correo enviado" };
  }

  async register(dto: CreateUsuarioDto) {
    const userData  = dto;

    let user;
    if(userData.id){
      const userId = userData.id
      delete userData.id;
      user = await this.userRepository.update(userId, userData);
    }else{
      user = await this.userRepository.save({ ...userData, password: bcrypt.hashSync(userData.password, 10)});
    }
    return user;
  }

}