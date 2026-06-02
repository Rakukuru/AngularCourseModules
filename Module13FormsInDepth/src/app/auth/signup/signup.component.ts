import { Component } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

function equalPasswords(control: AbstractControl) {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;
  if (password === confirmPassword) {
    return null;
  }
  return { passwordsNotEqual: true };
}

function equalValues(controlName1: string, controlName2: string) {
  return (control: AbstractControl) => {
    const value1 = control.get(controlName1)?.value;
    const value2 = control.get(controlName2)?.value;
    if (value1 === value2) {
      return null;
    }
    return { valuesNotEqual: true };
  };
}

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  imports: [ReactiveFormsModule],
})
export class SignupComponent {
  signupForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    passwords: new FormGroup(
      {
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]),
        confirmPassword: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]),
      },
      [equalValues('password', 'confirmPassword')],
    ),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    address: new FormGroup({
      street: new FormControl('', [Validators.required]),
      number: new FormControl('', [Validators.required]),
      postalCode: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
    }),
    role: new FormControl<
      'student' | 'teacher' | 'employee' | 'founder' | 'other'
    >('student'),
    source: new FormArray([
      new FormControl(false),
      new FormControl(false),
      new FormControl(false),
    ]),
    agree: new FormControl(false, [Validators.requiredTrue]),
  });

  // No need to call onReset since the default behavior of the reset button will reset the form for us.
  // If we wanted to do some custom logic on reset, then we could call this method on the click event of the reset button.
  /* onReset() {    
    this.signupForm.reset();
  } */

  onSubmit() {
    console.log(this.signupForm.value);

    if (this.signupForm.invalid) {
      console.log('Form is invalid');
      return;
    }
  }
}
