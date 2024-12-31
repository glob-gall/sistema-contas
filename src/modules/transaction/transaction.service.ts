import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Transaction } from '@prisma/client';
import { TransactionRepository } from './transaction.repository';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Injectable()
export class TransactionService {
  constructor(private transactionRepository: TransactionRepository) {}

  async fetchAll(userId: string): Promise<Transaction[]> {
    return await this.transactionRepository.fetchAll({
      where: {
        userId,
      },
    });
  }

  async fetchIncomes(userId: string): Promise<Transaction[]> {
    return await this.transactionRepository.fetchAll({
      where: {
        userId,
        type: 'INCOME',
      },
    });
  }

  async fetchOutcomes(userId: string): Promise<Transaction[]> {
    return await this.transactionRepository.fetchAll({
      where: {
        userId,
        type: 'OUTCOME',
      },
    });
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
