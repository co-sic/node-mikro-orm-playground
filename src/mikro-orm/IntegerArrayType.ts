import { Type, ValidationError } from '@mikro-orm/core';

export class IntegerArrayType extends Type<number[], string> {
  private readonly length?: number;

  constructor(length?: number) {
    super();
    this.length = length;
  }

  static lengthValidationError(value: number[], mode: string, length: number) {
    return new ValidationError(
      `Could not convert ${mode} value of type ${IntegerArrayType.name}. Array length must be ${length} but received ${value.length}.`,
    );
  }

  convertToDatabaseValue(value: number[]): string {
    if (this.length && value.length !== this.length) {
      throw IntegerArrayType.lengthValidationError(value, 'JS', this.length);
    }
    return `{${value.join(',')}}`;
  }

  convertToJSValue(value: number[]): number[] {
    if (!Array.isArray(value)) {
      throw ValidationError.invalidType(IntegerArrayType, value, 'database');
    }
    if (this.length && value.length !== this.length) {
      throw IntegerArrayType.lengthValidationError(value, 'database', this.length);
    }
    return value;
  }

  compareAsType(): string {
    return 'array';
  }

  getColumnType(): string {
    return 'int4[]';
  }
}
