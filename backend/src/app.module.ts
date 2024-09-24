import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { ListingsModule } from './listings/listings.module';

@Module({
  imports: [ListingsModule],
  controllers: [],
  providers: [PrismaService, AppService],
})
export class AppModule {}
