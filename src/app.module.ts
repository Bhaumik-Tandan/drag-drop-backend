import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { WorkflowsModule } from './workflows/workflows.module';

@Module({
  imports: [UserModule, PrismaModule, AuthModule, WorkflowsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
