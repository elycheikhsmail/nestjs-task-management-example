import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { use } from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { appConfig } from 'src/config/jwt.config';
import { Repository } from 'typeorm';
import { JwtPayload } from './jwt-payload.interface';
import { User } from './user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  // constructor(
  //   @InjectRepository(User)
  //   private userRepository: Repository<User>,
  // ) {
  //   super({
  //     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  //     ignoreExpiration: false,
  //     secretOrKey: 'topSecret1',
  //   });

  // }

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: appConfig().appSecret,
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    //console.log('validate');
    const { username } = payload;
    const user = await this.userRepository.findOneBy({ username });
    //console.log({ user });
    if (!use) {
      console.log('no user');
      throw new UnauthorizedException(); //'user not fount ...'
    }
    return user;
  }
}
