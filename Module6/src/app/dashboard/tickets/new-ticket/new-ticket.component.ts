import { Component, ViewChild, ElementRef, ViewChildren, QueryList, viewChildren, OnInit, AfterViewInit, output, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ControlComponent } from '../../../shared/control/control.component';
import { ButtonComponent } from '../../../shared/button/button.component';

@Component({
  selector: 'app-new-ticket',
  standalone: true,
  imports: [ControlComponent, ButtonComponent, FormsModule], //<-- FORMS MODULE NEEDED FOR TWO-WAY BINDING WITH NGMODEL
  templateUrl: './new-ticket.component.html',
  styleUrl: './new-ticket.component.css'
})
export class NewTicketComponent implements OnInit, AfterViewInit {
  @ViewChild('form') private formElement?: ElementRef<HTMLFormElement>;
  //@Output() add = new EventEmitter<{title: string, text: string}>(); //OLDER
  enteredTitle = '';
  enteredText = '';
  add = output<{title: string, text: string}>(); //NEWER
  //private formElement2 = viewChild.required<ElementRef<HTMLFormElement>>('form'); 
  // alternative way to access the form element using viewChild and required, which provides
  // a non-nullable reference to the form element, ensuring that it is available when accessed 
  // in the onSubmit method. This approach can help prevent potential null reference errors when 
  // trying to access the form element before it has been initialized. NEWER AND PREFERRED WAY 
  // TO ACCESS TEMPLATE ELEMENTS IN ANGULAR 16+ WITH STANDALONE COMPONENTS
  
  //@ViewChildren('inputs') inputElements?: QueryList<ElementRef<HTMLButtonElement>>; 
  // alternative way to access multiple input elements using @ViewChildren and QueryList

  //private buttons = viewChildren<ElementRef<HTMLButtonElement>>('button');
  // alternative way to access multiple button elements using viewChildren and QueryList, 
  // which allows you to access all button elements in the template and perform operations on them

  onSubmit() {
    this.add.emit({ title: this.enteredTitle, text: this.enteredText }); // Emit the new ticket data to the parent component

    this.formElement?.nativeElement.reset(); // Reset the form after submission
  }

  ngOnInit() {
    console.log('ngOnInit called');
    console.log('Form element in ngOnInit:', this.formElement); 
    // Logs the form element to the console during initialization, but it will be undefined at this 
    // point because the view has not been initialized yet
  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit called');
    console.log('Form element:', this.formElement?.nativeElement); 
    // Logs the form element to the console after the view has been initialized
    //console.log('Input elements:', this.inputElements?.toArray().map(el => el.nativeElement)); 
    // // Logs the input elements to the console after the view has been initialized
    //console.log('Button elements:', this.buttons?.toArray().map(el => el.nativeElement)); 
    // // Logs the button elements to the console after the view has been initialized
  }
}
