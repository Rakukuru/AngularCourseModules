import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  messages$ = new BehaviorSubject<string[]>([]);
  //private messages = signal<string[]>([]);
  //allMessages = this.messages.asReadonly();

  private messages: string[] = []; //By NOT using signal here, we can demonstrate how the MessagesListComponent 
  // will NOT update when a new message is added, since the "messages" property is not reactive.

  get allMessages() {
    return [...this.messages];
  }

  addMessage(message: string) {
    //this.messages.update((prevMessages) => [...prevMessages, message]);

    this.messages = [...this.messages, message]; //The copy does not notify of changes!
    this.messages$.next(this.messages); //By using a BehaviorSubject, we can manually trigger updates to any subscribers
  }
}