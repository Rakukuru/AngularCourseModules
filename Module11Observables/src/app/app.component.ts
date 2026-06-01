import { Component, inject, DestroyRef, OnInit, signal, effect } from '@angular/core';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs/internal/Observable';
import { interval } from 'rxjs/internal/observable/interval';
import { map } from 'rxjs/internal/operators/map';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  clickCount = signal(0);
  clickCount$ = toObservable(this.clickCount);
  interval$ = interval(1000);
  intervalSignal = toSignal(this.interval$, {initialValue: 0});
  customInterval$ = new Observable((subscriber) => {
    setInterval(() => {
      subscriber.next(`Custom interval value: ${Date.now()}`);
    }, 2000)
  });
  
  constructor() {
    effect(() => {
      console.log(`Button clicked ${this.clickCount()} times`);
    });
  }

  ngOnInit(): void {
    const subscription = interval(1000).pipe(
      map((value) => `Interval value: ${value}`)
    ).subscribe({
      //next: (value) => console.log(value),
      error: (err) => console.error(err),
    });
    const subscription2 = this.clickCount$.subscribe({
      next: (value) => console.log(`Click count from Observable: ${value}`)
    });
    const subscription3 = this.customInterval$.subscribe({
      next: (value) => console.log(value)
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
      subscription2.unsubscribe();
      subscription3.unsubscribe();
    });
  }

  onClick() {
    this.clickCount.update(prevCount => prevCount + 1);
  }
}