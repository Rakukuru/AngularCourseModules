import { Component, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface InvestmentInput {
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
  initialInvestment = signal(0);
  annualContribution = signal(0);
  expectedReturn = signal(5);
  investmentDuration = signal(10);
  calculateClicked = output<InvestmentInput>();
  // @Output() calculateClicked = new EventEmitter<InvestmentInput>();

  OnCalculateClicked() {
    this.calculateClicked.emit({
      initialInvestment: this.initialInvestment(),
      annualContribution: this.annualContribution(),
      expectedReturn: this.expectedReturn(),
      investmentDuration: this.investmentDuration()
    });

    this.initialInvestment.set(0);
    this.annualContribution.set(0);
    this.expectedReturn.set(5);
    this.investmentDuration.set(10);
  }
}
