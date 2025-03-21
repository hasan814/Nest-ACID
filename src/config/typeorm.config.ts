
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const TypeOrmConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_NAME'),
  autoLoadEntities: true, // usually better for development
  synchronize: configService.get<string>('DB_SYNCHRONIZE') === 'true',
  entities: [
    'dist/**/**/**/*.entity{.ts,.js}',
    'dist/**/**/*.entity{.ts,.js}',
  ],
});
