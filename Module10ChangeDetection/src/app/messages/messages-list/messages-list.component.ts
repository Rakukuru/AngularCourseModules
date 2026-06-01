import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  ChangeDetectorRef, 
  DestroyRef,
  OnInit,
} from '@angular/core';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-messages-list',
  standalone: true,
  templateUrl: './messages-list.component.html',
  styleUrl: './messages-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessagesListComponent implements OnInit {
  //messages = input.required<string[]>();
  private messagesService = inject(MessagesService);
  //messages = this.messagesService.allMessages;
  private cdRef = inject(ChangeDetectorRef);
  messages: string[] = [];
  private destroyRef = inject(DestroyRef);
  /*   get messages(){
    return this.messagesService.allMessages;
  } */
  ngOnInit() {
    const subscription = this.messagesService.messages$.subscribe((messages) => {
      this.messages = messages;
      this.cdRef.markForCheck(); //Manually trigger change detection when messages$ emits a new value
    });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  get debugOutput() {
    console.log('[MessagesList] "debugOutput" binding re-evaluated.');
    return 'MessagesList Component Debug Output';
  }
}
