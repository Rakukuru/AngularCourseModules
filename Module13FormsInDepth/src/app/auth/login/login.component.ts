import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
} from '@angular/forms';
import { debounceTime, of } from 'rxjs';

function mustContainAQuestionMark(control: AbstractControl) {
  if (control.value.includes('?')) {
    return null;
  }
  return { doesContainQuestionMark: true };
}

function emailMustBeUnique(control: AbstractControl) {
  if (control.value !== 'example@email.com') {
    return of(null);
  }
  return of({ emailUnique: true });
}

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [ReactiveFormsModule],
})

//THIS IS THE REACT DRIVEN APPROACH. t
// The template driven approach is in logintemplatedriven.component.ts
export class LoginComponent implements OnInit {
  myForm = new FormGroup({
    myEmail: new FormControl('example@email.com', {
      validators: [Validators.required, Validators.email],
      asyncValidators: [emailMustBeUnique],
    }),
    myPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      mustContainAQuestionMark,
    ]),
  });
  private destroyRef = inject(DestroyRef);

  getEmailIsInvalid() {
    return (
      this.myForm.controls.myEmail.invalid &&
      this.myForm.controls.myEmail.touched &&
      this.myForm.controls.myEmail.dirty
    );
  }

  getPasswordIsInvalid() {
    return (
      this.myForm.controls.myPassword.invalid &&
      this.myForm.controls.myPassword.touched &&
      this.myForm.controls.myPassword.dirty
    );
  }

  ngOnInit() {
      const savedFormData = window.localStorage.getItem('saved-login-form');
      if(savedFormData) {
        const loadedFormData = JSON.parse(savedFormData);
        const savedEmail = loadedFormData.myEmail;
        this.myForm.patchValue({myEmail: savedEmail});
      }

    const subscription = this.myForm.valueChanges.pipe(debounceTime(500)).subscribe({
      next: (value) => {
        window.localStorage.setItem('saved-login-form', JSON.stringify(value));
      },
    });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
  onSubmit() {
    const enteredEmail = this.myForm.controls.myEmail.value;
    const enteredPassword = this.myForm.controls.myPassword.value;
    console.log('Email:', enteredEmail);
    console.log('Password:', enteredPassword);
  }
}
