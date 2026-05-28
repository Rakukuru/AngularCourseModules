import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'button[app-button], a[app-button]',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
  host: {
    class: 'app-button' //<- Adds the 'app-button' class to the host element, which can be used for styling
  }
})
export class ButtonComponent {

}
