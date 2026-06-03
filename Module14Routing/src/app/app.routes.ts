import { Routes } from "@angular/router";
import { usersRoutes as userRoutesAlias } from "./users/users.routes"
import { NoTaskComponent } from "./tasks/no-task/no-task.component";
import { resolveUserName, UserTasksComponent } from "./users/user-tasks/user-tasks.component";
import { NotFoundComponent } from "./not-found/not-found.component";

export const routes: Routes = [
    {
        path: '', //<your-domain>
        component: NoTaskComponent,
        // redirectTo: 'users/u1',
        // pathMatch: 'full'
    },
    {
        path: 'users/:userId', //<your-domain>/users/<uid>
        component: UserTasksComponent,
        children: userRoutesAlias,
        data: {
            message: 'Hello!:)'
        },
        resolve: {
            userNameResolved: resolveUserName
        }
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];