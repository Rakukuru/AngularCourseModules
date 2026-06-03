import { CanMatchFn, RedirectCommand, Routes } from "@angular/router";
import { usersRoutes as userRoutesAlias } from "./users/users.routes"
import { NoTaskComponent } from "./tasks/no-task/no-task.component";
import { resolveTitle, resolveUserName, UserTasksComponent } from "./users/user-tasks/user-tasks.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { inject } from "@angular/core";
import { Router } from "@angular/router";

const dummyCanMatch: CanMatchFn = (route, segments) => {
    const router = inject(Router);
    const shouldGetAccess = Math.random();
    if(shouldGetAccess < 0.5){
        return true;
    } 
    return new RedirectCommand(router.parseUrl('/unauthorized'));
}

export const routes: Routes = [
    {
        path: '', //<your-domain>
        component: NoTaskComponent,
        // redirectTo: 'users/u1',
        // pathMatch: 'full'
        title: 'No User Selected'
    },
    {
        path: 'users/:userId', //<your-domain>/users/<uid>
        component: UserTasksComponent,
        children: userRoutesAlias,
        //canMatch: [dummyCanMatch], //Annoying 50% chance of failure when browing pages! FUN!
        data: {
            message: 'Hello!:)'
        },
        resolve: {
            userNameResolved: resolveUserName
        },
        title: resolveTitle
    },
    {
        path: '**',
        component: NotFoundComponent,
        title: 'URL Not Found'
    }
];