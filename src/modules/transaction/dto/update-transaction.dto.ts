import {
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { TransactionStatus } from '../enum/transaction.status.enum';
import { TransactionType } from '../enum/transaction.type.enum';

export class UpdateTransactionDto {
  id: string;

  @IsNumber()
  amount: number;

  @IsString()
  @IsOptional()
  description?: string | null;

  @IsDate()
  @IsOptional()
  dueDate?: Date | null;

  @IsEnum(TransactionStatus)
  status: TransactionStatus;

  @IsEnum(TransactionType)
  type: TransactionType;
}
