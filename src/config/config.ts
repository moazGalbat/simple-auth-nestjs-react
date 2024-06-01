import { registerAs } from '@nestjs/config';

export default registerAs('', () => {
  return {
    security: {
      expiresIn: process.env.JWT_EXPIRES_IN || '10m',
      refreshIn: process.env.JWT_REFRESH_IN || '7d',
      bcryptSaltOrRound: 10,
    },
    database: {
      url: process.env.DATABASE_URL || 'mongodb://localhost:27017/api',
    },
    app: {
      port: process.env.PORT || 3000,
    },
  };
});
