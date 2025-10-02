import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    UsersModule,
    PostsModule,
    AppModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      entities: [],
      synchronize: false,
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      host: 'localhost',
      database: 'nestjs_masterclass_blog_post',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
