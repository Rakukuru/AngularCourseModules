import { Routes } from '@angular/router';
import { TasksComponent } from '../tasks/tasks.component';
import { NewTaskComponent } from '../tasks/new-task/new-task.component';

export const usersRoutes: Routes = [
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'prefix', //Prefix: checks if url starts with 'users/:userId'
  }, //Full: check if whole url is //<your-domain>/users/<uid>
  // EFFECT: If going to '/<your-domain>/users/<uid>' it redirects to '//<your-domain>/users/<uid>/tasks'
  {
    path: 'tasks', //<your-domain>/users/<uid>/tasks
    component: TasksComponent,
  },
  {
    path: 'tasks/new',
    component: NewTaskComponent,
  },
];
