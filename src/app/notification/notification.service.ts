import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { scan } from 'rxjs/operators';

export interface Command {
  id: number;
  type: 'success' | 'error' | 'clear';
  message?: string;
}
@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  notificationsInput: Subject<Command>;
  notificationsOutput: Observable<Command[]>;
  constructor() {
    this.notificationsInput = new Subject<Command>();
    this.notificationsOutput = this.notificationsInput.pipe(
      scan((acc: Command[], value: Command) => {
        if (value.type === 'clear') {
          return acc.filter((command) => command.id !== value.id);
        } else {
          return [...acc, value];
        }
      }, [])
    );
  }

  addSuccessNotification(message: string) {
    const id = this.randomNumber();
    this.notificationsInput.next({
      id,
      type: 'success',
      message: message,
    });
    setTimeout(() => {
      this.clear(id);
    }, 4000);
  }

  addErrorNotification(message: string) {
    const id = this.randomNumber();
    this.notificationsInput.next({
      id,
      type: 'error',
      message: message,
    });
    setTimeout(() => {
      this.clear(id);
    }, 4000);
  }
  clear(id: number) {
    this.notificationsInput.next({
      id: id,
      type: 'clear',
    });
  }

  randomNumber(): number {
    return Math.round(Math.random() * 1000);
  }
}
