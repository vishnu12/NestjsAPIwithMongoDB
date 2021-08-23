import { Module,NestModule, RequestMethod, MiddlewareConsumer } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { AuthMiddleware } from 'src/middlewares/auth/auth.middleware';
import { PostController } from './post.controller';
import { postProviders } from './post.provider';
import { PostService } from './post.service';

@Module({
    imports:[DatabaseModule],
    controllers:[PostController],
    providers:[PostService,...postProviders],
    exports:[PostService,...postProviders]
})
export class PostModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
          .apply(AuthMiddleware)
          .forRoutes({ path: '/posts/create', method: RequestMethod.POST },{ path: '/posts', method: RequestMethod.GET });

    //    consumer
    //         .apply(AuthMiddleware)
    //         .forRoutes({ path: '/posts', method: RequestMethod.GET })   
      }
}
