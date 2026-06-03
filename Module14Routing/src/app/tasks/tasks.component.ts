import { Component, input, signal, inject, computed, OnInit, DestroyRef } from '@angular/core';

import { TaskComponent } from './task/task.component';
import { Task } from './task/task.model';
import { TasksService } from './tasks.service';
import { ActivatedRoute, RouterLink } from "@angular/router";

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, RouterLink],
})
export class TasksComponent implements OnInit {
  userId = input.required<string>();
  // order = input<'asc' | 'desc'>(); // "order" matches the query param we set in tasks.html and gets automatically set
  //myOrder?: 'asc' | 'desc';
  myOrder = signal<'asc' | 'desc'>('desc');
  private tasksService = inject(TasksService);
  userTasks = computed(() => this.tasksService.allTasks()
  .filter((f) => f.userId === this.userId())
  .sort((a,b) => {
    if( this.myOrder() === 'desc'){
      return a.id > b.id ? -1 : 1;
    } else {
      return a.id > b.id ? 1 : -1;
    }
  }) );
  destroyRef = inject(DestroyRef);
  private activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    const subscription = this.activatedRoute.queryParams.subscribe({
      next: (params) => (this.myOrder.set( params['order'] ) ), // "order" matches the query param
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe() );
  }
}
