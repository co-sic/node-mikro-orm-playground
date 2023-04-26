import { EntityProperty, ValidationError, Platform, Type } from '@mikro-orm/core';
import { CalendarDate } from 'calendar-date';

export class CalendarDateType extends Type<CalendarDate, string> {
  convertToDatabaseValue(value: CalendarDate | string | undefined | null): string {
    if (value instanceof CalendarDate) {
      return value.toString();
    }

    if (!value || value.toString().match(/^\d{4}-\d{2}-\d{2}$/)) {
      return value as string;
    }

    throw ValidationError.invalidType(CalendarDateType, value, 'JS');
  }

  convertToJSValue(value: CalendarDate | string | null | undefined): CalendarDate {
    console.log(`Instance of date: ${value instanceof Date}, instance of string: ${typeof value === 'string' }`);
    if (!value || value instanceof CalendarDate) {
      return value as CalendarDate;
    }
    return new CalendarDate(value);
  }

  compareAsType(): string {
    return 'date';
  }

  getColumnType(prop: EntityProperty, platform: Platform): string {
    return platform.getDateTypeDeclarationSQL(prop.length);
  }

  toJSON(value: CalendarDate): CalendarDate | string {
    return this.convertToDatabaseValue(value);
  }
}