import { DatePipe, DecimalPipe } from '@angular/common';
import { Component } from '@angular/core';
import { TemperaturePipe } from './temperature.pipe';
import { SortPipe } from './sort.pipe';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [DatePipe, DecimalPipe, TemperaturePipe, SortPipe],
})
export class AppComponent {
  currentDate = new Date();
  currentTemperaturs = {
    berlin: 4.2749812,
    newYork: 18.1214,
    paris: 72.1209001,
    chicago: 65.0775238,
  };

  historicTemperatures = [
    25, 37, 19, -4, 28, 21, 19, 28, 33, 31, 9, 11, 5, -12, -5,
  ];

  constructor() {
    this.historicTemperatures.sort((a, b) => a - b); //This is needed to make sure the temperatures 
    //are sorted when the app starts, otherwise they would only be sorted after the first change 
    // detection cycle, which happens when you click on one of the temperatures to reset it
  }

  onReset(index: number) {
    this.historicTemperatures[index] = 18;
/*     const newTemps = [...this.historicTemperatures];  
    newTemps[index] = 18;
    this.historicTemperatures = newTemps; */ //--> With this you dont need to set sortPipe as impure, which is quite costly

    this.historicTemperatures.sort((a, b) => a - b); //This is needed to make sure the temperatures are sorted after resetting one of them, otherwise they would only be sorted after the first change detection cycle, which happens when you click on one of the temperatures to reset it
  }
}
