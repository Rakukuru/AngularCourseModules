import { CommonModule, CurrencyPipe} from '@angular/common';
import { Component, Input } from '@angular/core';
import { UserInput } from "../user-input/user-input.component";

interface InvestmentResult {
  year: number;
  investmentValue: number;
  interestYear: number;
  interestTotal: number;
  investedCapital: number;
}

@Component({
  selector: 'app-investment-results',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './investment-results.component.html',
  styleUrl: './investment-results.component.css'
})
export class InvestmentResultsComponent {
  private _userInput?: UserInput;

  @Input()
  set userInput(value: UserInput | undefined) {
    if (value) {
      this._userInput = value;
      this.calculateInvestmentResults(value);
    }
  }

  get userInput(): UserInput | undefined {
    return this._userInput;
  }

  InvestmentResults: InvestmentResult[] = [];

  calculateInvestmentResults(userInput: UserInput) {
    const results: InvestmentResult[] = [];
    let currentInvestment = userInput.initialInvestment;
    let investedCapital = userInput.initialInvestment;

    for (let i = 0; i <= userInput.investmentDuration -1; i++) {
      const year = i + 1;
      const interestYear = currentInvestment * (userInput.expectedReturn / 100);
      currentInvestment += interestYear + userInput.annualContribution;
      const totalInterest = currentInvestment - userInput.annualContribution * year - userInput.initialInvestment;
      investedCapital += userInput.annualContribution;

      results.push({
        year,
        investmentValue: Number(currentInvestment.toFixed(2)),
        interestYear: Number(interestYear.toFixed(2)),
        interestTotal: Number(totalInterest.toFixed(2)),
        investedCapital: Number(investedCapital.toFixed(2)),
      });
    }

    this.InvestmentResults = results;
  }
}