import { BadRequestException, PipeTransform } from '@nestjs/common';
import { TaskStatus } from '../task-status-enum';

export class TaskValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE,
  ];

  transform(value: any) {
    //throw new Error("Method not implemented.");
    console.log({ value });
    if (!value) {
      throw new BadRequestException(` empty status`);
    }
    if (value) value = value.toUpperCase();
    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`"${value}" is invalid status`);
    }

    return value;
  }

  private isStatusValid(status: any) {
    const idx = this.allowedStatuses.indexOf(status);
    return idx !== -1;
  }
}
