import { Component, input, ViewEncapsulation, HostBinding, HostListener, inject, ElementRef, ContentChild, AfterContentInit, afterRender, afterNextRender } from '@angular/core';

@Component({
  selector: 'app-control',
  standalone: true,
  imports: [],
  encapsulation: ViewEncapsulation.None, //<- Removes the default Angular encapsulation, allowing styles to be applied globally
  host: {
    class: 'control', //<- Adds the 'control' class to the host element, which can be used for styling
    '(click)': 'onClick()' //<- Binds the click event to the onClick method
  },
  templateUrl: './control.component.html',
  styleUrl: './control.component.css'
})

export class ControlComponent implements AfterContentInit {
  //@HostBinding('class') className = 'control'; //<- Adds the 'control' class to the host element, which can be used for styling
  // @HostListener('click') onClick2() {
  //   console.log('Control clicked!');
  // }
  label = input.required<string>();
  private el = inject(ElementRef);
  @ContentChild('input') private control?: ElementRef<HTMLInputElement | HTMLTextAreaElement>; //<- Accesses the input element projected into the component using ContentChild and a template reference variable

  constructor() {
    afterRender(() => {
      console.log('After every render:');
      console.log('Host element:', this.el.nativeElement);  //<- Logs the host element to the console after every render
    });

    afterNextRender(() => {
      console.log('After next render:');
      console.log('Host element:', this.el.nativeElement); //<- Logs the host element to the console after the next render
    });

  }

  ngAfterContentInit() {
    //
  }

  onClick() {
    console.log('Control clicked!');
    console.log('Host element:', this.el.nativeElement); //<- Logs the host element to the console
    console.log('Projected control element:', this.control?.nativeElement); //<- Logs the projected control element to the console, if it exists
  }
}
