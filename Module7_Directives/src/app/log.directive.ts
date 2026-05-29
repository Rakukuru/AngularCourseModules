import { Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: '[appLog]',
  standalone: true,
  host: {
    '(click)': 'onLog()'
  }
})
export class LogDirective {
  private ElementRef = inject(ElementRef);

  constructor() { }

  onLog() {
    console.log(this.ElementRef.nativeElement + ' was clicked!');
  }
}
