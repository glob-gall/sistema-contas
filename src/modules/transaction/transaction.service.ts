import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Transaction } from '@prisma/client';
import { TransactionRepository } from './transaction.repository';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { FetchTransactionsQuery } from './dto/fetch-transactions-query.dto';

@Injectable()
export class TransactionService {
  constructor(private transactionRepository: TransactionRepository) {}

  async fetchAll(userId: string, query: FetchTransactionsQuery) {
    const transactions = await this.transactionRepository.fetchAll({
      where: {
        userId,
        type: query.type,
        status: query.status,
      },
    });

    const total = transactions.reduce((acc, curr) => acc + curr.amount, 0);

    return {
      transactions,
      total,
    };
  }

  async createTransaction(
    userId: string,
    { amount, status, type, description, dueDate }: CreateTransactionDto,
  ): Promise<Transaction> {
    return await this.transactionRepository.create({
      amount,
      description,
      dueDate,
      status,
      type,
      User: { connect: { id: userId } },
    });
  }

  async updateTransaction(
    userId: string,
    { id, amount, status, type, description, dueDate }: UpdateTransactionDto,
  ): Promise<Transaction> {
    const findedTransaction = await this.transactionRepository.findOne({
      where: {
        id,
      },
    });

    if (findedTransaction.userId !== userId) {
      throw new UnauthorizedException();
    }

    return await this.transactionRepository.update({
      data: {
        amount,
        status,
        type,
        description,
        dueDate,
        updatedAt: new Date(),
      },
      where: {
        id,
      },
    });
  }
}
