import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  ChangeDetectorRef, 
  DestroyRef,
  OnInit,
} from '@angular/core';
import {AsyncPipe} from '@angular/common';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-messages-list',
  standalone: true,
  templateUrl: './messages-list.component.html',
  styleUrl: './messages-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe],
})
export class MessagesListComponent {
  //messages = input.required<string[]>();
  //messages = this.messagesService.allMessages;
  private messagesService = inject(MessagesService);
  messages$ = this.messagesService.messages$;

  get debugOutput() {
    console.log('[MessagesList] "debugOutput" binding re-evaluated.');
    return 'MessagesList Component Debug Output';
  }
}
