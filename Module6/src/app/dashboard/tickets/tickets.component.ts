import { Component } from '@angular/core';
import { NewTicketComponent } from './new-ticket/new-ticket.component';
import { Ticket } from './ticket.model';
import { TicketComponent } from "./ticket/ticket.component";

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [NewTicketComponent, TicketComponent],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.css'
})
export class TicketsComponent {
  tickets: Ticket[] = [];

  addTicket(newTicket: Ticket) {
    this.tickets.push(newTicket);
  }

  onAdd(event: { title: string; text: string }) {
    const newTicket: Ticket = {
      id: (this.tickets.length + 1).toString(), // Generate a simple ID based on the current number of tickets
      title: event.title,
      request: event.text,
      status: 'open'
    };
    this.addTicket(newTicket); // Add the new ticket to the list of tickets
  }

  onClose(ticketId: string) {
    this.tickets = this.tickets.map((ticket) => {
      if (ticket.id === ticketId) {
        return { ...ticket, status: 'closed' }; // Update the status of the ticket to 'closed'
      }
      return ticket; // Return the ticket unchanged if it doesn't match the ID
    });
  }
}
