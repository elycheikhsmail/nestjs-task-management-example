import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
//import { defaultOptions } from './config/typeorm.config';

import { AuthModule } from './auth/auth.module';
import { Task } from './tasks/task.entity';
import { User } from './auth/user.entity';
import { ConfigModule } from '@nestjs/config';
import { typeOrmAsyncConfig } from './config/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    // ignoreEnvFile: true, // option
    //  isGlobal: true, // option

    // ConfigModule.forRoot({
    //   envFilePath: ['.env.development.local', '.env.development'],
    // }),
    TypeOrmModule.forRootAsync({ ...typeOrmAsyncConfig }),
    //.forRoot({...defaultOptions,entities: [Task, User]}),
    TasksModule,
    AuthModule,
  ],
})
export class AppModule {
  // constructor(
  //   private dataSource: DataSource
  // ){
  // }
}
