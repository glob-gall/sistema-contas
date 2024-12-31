import {
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { TransactionStatus } from '../enum/transaction.status.enum';
import { TransactionType } from '../enum/transaction.type.enum';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateTransactionDto {
  id: string;

  @ApiPropertyOptional()
  @IsNumber()
  amount: number | null;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description?: string | null;

  @ApiPropertyOptional()
  @IsDate()
  @IsOptional()
  dueDate?: Date | null;

  @ApiPropertyOptional()
  @IsEnum(TransactionStatus)
  status: TransactionStatus;

  @ApiPropertyOptional()
  @IsEnum(TransactionType)
  type: TransactionType;
}
