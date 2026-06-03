import { Component, input, inject, computed, OnInit, DestroyRef } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, RouterOutlet, RouterLink, ResolveFn, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
  imports: [RouterOutlet, RouterLink],
})
export class UserTasksComponent implements OnInit {
  userId = input.required<string>(); //"userId" must be the same as the ":userId" route we set
  private usersService = inject(UsersService);
  private activatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);
  message = input.required<string>();
  // userName = computed(() => this.usersService.users.find(u => u.id === this.userId())?.name);
  userName = '';
  userNameResolved = input.required<string>();
  
  ngOnInit(): void {
    console.log('Another way to resolve the username: '+ this.userNameResolved())
    console.log(this.message());
    console.log(this.activatedRoute);
    console.log('Snapshot values:');
    console.log(this.activatedRoute.snapshot);
    const userId2 = this.activatedRoute.snapshot.paramMap.get('userId'); // This snapshot doesn't get recalculated, therefore we will always get the same userId
    // Still useful for usecases where we want to send a parameter from a single use component that doesn't get reused.
    const subscription = this.activatedRoute.paramMap.subscribe({
      next: (paramMap) => {
        const userId = paramMap.get('userId');
        this.userName = this.usersService.users.find(u => u.id === userId)?.name || '';
      },
    });

    const subscription2 = this.activatedRoute.data.subscribe({
      next: data => { console.log('activatedRoute.data'); console.log(data); }
    })
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe;
      subscription2.unsubscribe
    });
  }
}

export const resolveUserName: ResolveFn<string> = ( //Save function into variable
  activatedRoute: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot) => { 
    const usersService = inject(UsersService);
    const userId = activatedRoute.paramMap.get('userId');
    const userName = usersService.users.find(u => u.id === userId)?.name || '';
    return userName;
}

export const resolveTitle: ResolveFn<string> = (
  activatedRoute,
  routerState
) => {
  return resolveUserName(activatedRoute, routerState) + '\'s Tasks';
}
