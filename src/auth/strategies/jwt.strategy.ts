import { PassportStrategy } from '@nestjs/passport';
import { User } from '../entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy( Strategy ){

    constructor( 
        @InjectRepository( User )
        private readonly userRepository: Repository<User>, 
        configService: ConfigService){
        super({
            secretOrKey: configService.get('JWT_SEED'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

    async validate( payload: any ) : Promise<User> {

        const { email } = payload;

        const user = await this.userRepository.findOneBy({ email } );
        
        if( !user )
            throw new UnauthorizedException(' Token not valid')

        if( !user.isActive )
            throw new UnauthorizedException('Token not valid')

        return user;
    }

}
