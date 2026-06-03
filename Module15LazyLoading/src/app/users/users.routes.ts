import { Routes } from '@angular/router';

import { NewTaskComponent, canLeaveEditPage } from '../tasks/new-task/new-task.component';

import { Task } from '../tasks/task/task.model';
import { inject } from '@angular/core';
import { TasksService } from '../tasks/tasks.service';
import { ResolveFn } from '@angular/router';

export const resolveUserTasks: ResolveFn<Task[]> = (
  activatedRouteSnapshot,
  routerState
) => {
  const order = activatedRouteSnapshot.queryParams['order'];
  const tasksService = inject(TasksService);
  const tasks = tasksService
    .allTasks()
    .filter(
      (task) => task.userId === activatedRouteSnapshot.paramMap.get('userId')
    );

  if (order && order === 'asc') {
    tasks.sort((a, b) => (a.id > b.id ? 1 : -1));
  } else {
    tasks.sort((a, b) => (a.id > b.id ? -1 : 1));
  }

  return tasks.length ? tasks : [];
};


export const routes: Routes = [
  {
    path: '',
    providers: [TasksService],
    redirectTo: 'tasks',
    pathMatch: 'full',
  },
  { //LAZY LOAD THE TASKS
    path: 'tasks', // <your-domain>/users/<uid>/tasks
    loadComponent: () => import('../tasks/tasks.component').then(mod => mod.TasksComponent),
    runGuardsAndResolvers: 'always',
    resolve: {
      userTasks: resolveUserTasks, // This function CANNOT BE loaded inside TasksComponent, otherwise there will be no lazy loading!
    },
  },
  {
    path: 'tasks/new',
    component: NewTaskComponent,
    canDeactivate: [canLeaveEditPage]
  },
];
