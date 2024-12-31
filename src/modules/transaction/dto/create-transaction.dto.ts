import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Validate,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { TransactionStatus } from '../enum/transaction.status.enum';
import { TransactionType } from '../enum/transaction.type.enum';

@ValidatorConstraint({ name: 'IsAmountValidForType', async: false })
class IsAmountValidForType implements ValidatorConstraintInterface {
  validate(amount: number, args: ValidationArguments) {
    const object = args.object as CreateTransactionDto;
    if (object.type === TransactionType.INCOME) {
      return amount > 0; // Must be positive
    } else if (object.type === TransactionType.OUTCOME) {
      return amount <= 0; // Must be non-positive
    }
    return true; // Valid if no specific type
  }

  defaultMessage(args: ValidationArguments) {
    const object = args.object as CreateTransactionDto;
    if (object.type === TransactionType.INCOME) {
      return 'Amount must be positive for INCOME transactions.';
    } else if (object.type === TransactionType.OUTCOME) {
      return 'Amount must be non-positive for OUTCOME transactions.';
    }
    return 'Invalid amount for the given transaction type.';
  }
}

export class CreateTransactionDto {
  @IsNotEmpty()
  @IsNumber()
  @Validate(IsAmountValidForType)
  amount: number;

  @IsOptional()
  description?: string | null;

  @IsOptional()
  dueDate?: Date | null;

  @IsEnum(TransactionStatus)
  status: TransactionStatus;

  @IsEnum(TransactionType)
  type: TransactionType;
}
