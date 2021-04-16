import { Component, OnInit } from '@angular/core';
import { NotificationService, Command } from '../notification.service';
@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css'],
})
export class NotificationListComponent implements OnInit {
  messages: Command[];
  constructor(private notifiSer: NotificationService) {
    this.notifiSer.notificationsOutput.subscribe((messages) => {
      this.messages = messages;
    });
  }

  ngOnInit(): void {}
  dismiss(id: number) {
    this.notifiSer.clear(id);
  }
}
