import { JwtModuleAsyncOptions } from '@nestjs/jwt';

export const appConfig = () => ({
  appSecret: process.env.JWT_SECRET,
});

export const jwtConfig: JwtModuleAsyncOptions = {
  useFactory: () => {
    return {
      secret: appConfig().appSecret,
      signOptions: { expiresIn: '1d' },
    };
  },
};
