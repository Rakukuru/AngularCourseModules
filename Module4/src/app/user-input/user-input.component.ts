import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface UserInput {
  initialInvestment: number;
  annualContribution: number;
  expectedReturn: number;
  investmentDuration: number;
}

@Component({
  selector: 'app-user-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css'
})
export class UserInputComponent {
  initialInvestment: number = 0;
  annualContribution: number = 0;
  expectedReturn: number = 5;
  investmentDuration: number = 10;
  @Output() calculateClicked = new EventEmitter<UserInput>();

  OnCalculateClicked() {
    this.calculateClicked.emit({
      initialInvestment: this.initialInvestment,
      annualContribution: this.annualContribution,
      expectedReturn: this.expectedReturn,
      investmentDuration: this.investmentDuration
    });

    this.initialInvestment = 0;
    this.annualContribution = 0;
    this.expectedReturn = 5;
    this.investmentDuration = 10;
  }
}
