import { Injectable } from '@nestjs/common';
import { Prisma, Transaction } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class TransactionRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.TransactionCreateInput): Promise<Transaction> {
    return this.prisma.transaction.create({ data });
  }
  async update(data: Prisma.TransactionUpdateArgs): Promise<Transaction> {
    return this.prisma.transaction.update(data);
  }
  async findOne(data: Prisma.TransactionFindUniqueArgs): Promise<Transaction> {
    return this.prisma.transaction.findUnique(data);
  }
  async fetchAll(data: Prisma.TransactionFindManyArgs): Promise<Transaction[]> {
    return this.prisma.transaction.findMany(data);
  }
  async delete(data: Prisma.TransactionDeleteArgs): Promise<Transaction> {
    return this.prisma.transaction.delete(data);
  }
}
