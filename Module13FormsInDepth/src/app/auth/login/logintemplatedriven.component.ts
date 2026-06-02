import { afterNextRender, Component, DestroyRef, inject, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './logintemplatedriven.component.html',
  styleUrl: './logintemplatedriven.component.css',
  imports: [FormsModule],
})
export class LoginTemplateDrivenComponent {
  private form = viewChild.required<NgForm>('form');
  private destroyRef = inject(DestroyRef);
  
  constructor() {
    afterNextRender(() => {
      const savedFormData = window.localStorage.getItem('saved-login-form');
      if(savedFormData) {
        const loadedFormData = JSON.parse(savedFormData);
        const savedEmail = loadedFormData.email;
        setTimeout(() => {
          this.form().controls['email'].setValue(savedEmail);
        }, 1);
      }

      const subscription = this.form().valueChanges?.subscribe({
        next: (value) => window.localStorage.setItem('saved-login-form', JSON.stringify(value)),
      });

      this.destroyRef.onDestroy(() => subscription?.unsubscribe());
    });
  }

  onSubmit(formData: NgForm) {
    console.log(formData);
    // const isEnteredEmailValid = formData.form.controls['email'].valid;
    // const isEnteredPasswordValid = formData.form.controls['password'].valid;
    if(formData.invalid) {
      return;
    }
    const enteredEmail = formData.form.value.email;
    const enteredPassword = formData.form.value.password;
  }
}
