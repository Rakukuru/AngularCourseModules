import { Component, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TasksService } from '../tasks.service';
import { CanDeactivateFn, Router, RouterLink } from "@angular/router";

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  userId = input.required<string>();
  enteredTitle = signal('');
  enteredSummary = signal('');
  enteredDate = signal('');
  private tasksService = inject(TasksService);
  private router = inject(Router)
  submitted = false;

  onSubmit() {
    this.tasksService.addTask(
      {
        title: this.enteredTitle(),
        summary: this.enteredSummary(),
        date: this.enteredDate(),
      },
      this.userId()
    );
    this.submitted = true; // Stop the canLeaveEditPage from trying to stop the user when submitting a page

    this.router.navigate(['/users', this.userId(), 'tasks'], {
      replaceUrl: true, //Do not let the user to go back on the browser 
    });
  }
}

export const canLeaveEditPage: CanDeactivateFn<NewTaskComponent> = (component) => {
  if(component.submitted) return true;
  if(component.enteredTitle() || component.enteredDate() || component.enteredSummary()){
    return window.confirm('Do you really want to leave? You will loose the entered data.')
  }
  return true;
}