import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { InvestmentInput, UserInputComponent } from "./user-input/user-input.component";
import { InvestmentResultsComponent } from "./investment-results/investment-results.component";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [HeaderComponent, UserInputComponent, InvestmentResultsComponent],
})
export class AppComponent {
  userInput!: InvestmentInput;
  
  onCalculateClicked(userInput: InvestmentInput) {
    this.userInput = userInput;
  }
}
