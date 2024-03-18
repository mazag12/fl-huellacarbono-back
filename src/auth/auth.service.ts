import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { LoginDto, CreateUsuarioDto, PasswordReset } from './dto';
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
    let isValid = true;
    const user = await this.userRepository.findOne({
      where: { code },
      select: ['id', 'code', 'email', 'nombre', 'apellido', 'password', 'isActive', 'role'],
    });
    if (!user) throw new UnauthorizedException('Credenciales invalidas, codigo inexistente');
    if (!user.isActive) throw new UnauthorizedException('El usuario no esta activo');
    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Contraseña incorrecta');
    
    if(user.password == '$2b$10$rnnPp/Whd2Wa8Vt5bqxGbuIBC0OZQWmlAu4zxoxWEvj2PVhDqreea'){
      isValid = false;
    }

    return await this.getJwtToken(user, isValid);
  }

  getJwtToken = ({ id, email, nombre, apellido, code, role }, isValid) => 
    this.jwtService.signAsync({ sub: +id, email, nombre, apellido, code, role, isValid })

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

  async PostResetPassword(dto: PasswordReset) {
    await this.userRepository.update(dto.id, {password: bcrypt.hashSync(dto.password, 10)});
    return {message: 'Se reseteo la Contraseña'};
  }

  upsertUser = (dt: CreateUsuarioDto) =>
    dt.id
      ? this.methodFromDtoAndUpdate(dt.id, dt, 'userRepository')
      : this.userRepository.save(dt);


  methodFromDtoAndUpdate = (id: number, dto, repository) => {
    delete dto.id;
    return this[repository].update(id, dto);
  }


}