import { IsEnum, IsOptional } from 'class-validator';
import { TransactionStatus } from '../enum/transaction.status.enum';
import { TransactionType } from '../enum/transaction.type.enum';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class FetchTransactionsQuery {
  @ApiPropertyOptional({ enum: TransactionType })
  @IsEnum(TransactionType)
  @IsOptional()
  type?: TransactionType;

  @ApiPropertyOptional({ enum: TransactionStatus })
  @IsEnum(TransactionStatus)
  @IsOptional()
  status?: TransactionStatus;
}
