import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthCridentialsDto } from './dto/auth-cridentials.dto';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signup(
    @Body(ValidationPipe) authcridentialDto: AuthCridentialsDto,
  ): Promise<void> {
    return this.authService.signUp(authcridentialDto);
  }

  @Post('/signin')
  signIn(
    @Body(ValidationPipe) authcridentialDto: AuthCridentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authcridentialDto);
  }

  @Post('/test') // protectHandler
  @UseGuards(AuthGuard())
  test(@Req() req) {
    const user: User = req.user;
    console.log(user);
  }
}
