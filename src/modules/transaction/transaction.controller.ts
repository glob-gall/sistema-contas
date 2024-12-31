import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { FetchTransactionsQuery } from './dto/fetch-transactions-query.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @UseGuards(AuthGuard)
  @Get()
  fetchTransactions(@Request() req, @Query() query: FetchTransactionsQuery) {
    return this.transactionService.fetchAll(req.token.user.id, query);
  }

  @UseGuards(AuthGuard)
  @Post()
  register(
    @Body()
    { amount, status, type, description, dueDate }: CreateTransactionDto,
    @Request() req,
  ) {
    return this.transactionService.createTransaction(req.token.user.id, {
      amount,
      status,
      type,
      description,
      dueDate,
    });
  }

  @UseGuards(AuthGuard)
  @Put()
  update(@Body() dto: UpdateTransactionDto, @Request() req) {
    return this.transactionService.updateTransaction(req.token.user.id, dto);
  }
}
