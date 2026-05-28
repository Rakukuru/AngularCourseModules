import { Component, OnInit, OnDestroy, inject, DestroyRef, signal, effect } from '@angular/core';

@Component({
  selector: 'app-server-status',
  standalone: true,
  imports: [],
  templateUrl: './server-status.component.html',
  styleUrl: './server-status.component.css'
})
export class ServerStatusComponent implements OnInit, OnDestroy {
  currentStatus = signal<'online' | 'offline' | 'unknown'>('offline');
  private interval?: number;
  //private interval2?: ReturnType<typeof setInterval>; // alternative way to type the interval variable
  // private destroyRef = inject(DestroyRef); // alternative to ngOnDestroy for cleanup tasks, especially useful in standalone components without lifecycle hooks
  constructor() {
    effect(() => {
      console.log('Current server status:', this.currentStatus());
    });
  }

  /* effect((onCleanup) => {
    const tasks = getTasks();
    const timer = setTimeout(() => {
      console.log(`Current number of tasks: ${tasks().length}`);
    }, 1000);
    onCleanup(() => {
      clearTimeout(timer);
    });
  });
 */

  ngOnInit() { // executes only once after the component is initialized PREFERRED
    //   constructor() { // executes before the component is initialized, used for dependency injection and basic setup
    this.interval = setInterval(() => {
      const randomValue = Math.random();
      if (randomValue < 0.5) {
        this.currentStatus.set('online');
      } else if (randomValue < 0.8) {
        this.currentStatus.set('offline');
      } else {
        this.currentStatus.set('unknown');
      }
    }, 5000); // Simulate status change every 5 seconds

    // this.destroyRef.onDestroy(() => {
    //   if (this.interval) {
    //     clearInterval(this.interval);
    //   }
    // });
  }

  ngOnDestroy() { // executes when the component is being destroyed, used for cleanup tasks
    if (this.interval) {
      clearInterval(this.interval);
    }
    console.log('ngOnDestroy called');
  }

  ngAfterViewInit() { // executes after the component's view has been fully initialized, used for DOM manipulation and accessing child components
    console.log('ngAfterViewInit called');
  } 
}
