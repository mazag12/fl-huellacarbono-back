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
import { JwtPayLoad } from './interfaces/jwt-payload';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User, 'DEV')
    private readonly userRepository: Repository<User>,

    private jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;

      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
      });

      await this.userRepository.save(user);
      delete user.password;

      return {
        ...user,
        token: this.getJwtToken({ email: user.email }),
      };
    } catch (error) {
      if (error.code == '11000') {
        throw new BadRequestException(`${createUserDto.email} already exists!`);
      }
      throw new InternalServerErrorException('Somethin terribe happen!!!');
    }
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.userRepository.findOne({
      where: { email },
      select: { email: true, password: true, id: true },
    });

    if (!user) throw new UnauthorizedException('Not valid credentials - email');
    if (!bcrypt.compareSync(password, user.password)) throw new UnauthorizedException('Not valid credentials - password');

    return {
      ...user,
      token: this.getJwtToken({ email: user.email }),
    };
  }

  getJwtToken(payload: JwtPayLoad) {
    const token = this.jwtService.signAsync(payload);
    return token;
  }
}
