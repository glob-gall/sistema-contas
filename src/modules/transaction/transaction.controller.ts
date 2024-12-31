import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @UseGuards(AuthGuard)
  @Get()
  fetchTransactions(@Request() req) {
    return this.transactionService.fetchAll(req.token.user.id);
  }

  @UseGuards(AuthGuard)
  @Get('/income')
  fetchIncomeTransactions(@Request() req) {
    return this.transactionService.fetchIncomes(req.token.user.id);
  }

  @UseGuards(AuthGuard)
  @Get('/outcome')
  fetchOutcomeTransactions(@Request() req) {
    return this.transactionService.fetchOutcomes(req.token.user.id);
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
