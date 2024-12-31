import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { JwtService } from '@nestjs/jwt';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { TransactionRepository } from './transaction.repository';

@Module({
  imports: [PrismaModule],
  controllers: [TransactionController],
  providers: [TransactionService, TransactionRepository, JwtService],
  exports: [TransactionService],
})
export class TransactionModule {}
