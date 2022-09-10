import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AuthCridentialsDto } from './dto/auth-cridentials.dto';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(authCridentialDto: AuthCridentialsDto): Promise<void> {
    const { username, password } = authCridentialDto;
    const user = new User();
    user.username = username;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);

    try {
      await user.save();
    } catch (error) {
      if (error.code === '23505') {
        // duplicate username
        throw new ConflictException('user already exist');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async signIn(
    authCridentialDto: AuthCridentialsDto,
  ): Promise<{ accessToken: string }> {
    const username = await this.validateUserPassword(authCridentialDto);
    if (!username) {
      throw new UnauthorizedException('Invalid cridentials !!');
    }
    const payload: JwtPayload = { username };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }

  async validateUserPassword(authCridentialDto: AuthCridentialsDto) {
    const { username, password } = authCridentialDto;
    const user = await this.userRepository.findOneBy({ username });
    if (user && (await user.validatePassword(password))) {
      return user.username;
    } else {
      return null;
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
