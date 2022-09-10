import { IsString, MaxLength, MinLength } from 'class-validator';

export class AuthCridentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  password: string;
}
