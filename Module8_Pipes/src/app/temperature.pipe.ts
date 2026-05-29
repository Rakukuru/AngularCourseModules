import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'temp',
  standalone: true,
})
export class TemperaturePipe implements PipeTransform {
  transform(
    value: string | number | null,
    inputType: 'C' | 'F' = 'C', //Celsius is always the best! Use it as default type
    outputType: 'C' | 'F' = 'C',
  ): string {
    if(!value) {
      return '';
    }
    let val: number;

    if (typeof value === 'string') {
      val = parseFloat(value);
    } else {
      val = value;
    }

    if (inputType === 'C' && outputType === 'F') {
      const fahrenheit = val * (9 / 5) + 32; //Formula to convert Celsius to Fahrenheit
      return `${fahrenheit.toFixed(2)} °F`;
    } else if (inputType === 'F' && outputType === 'C') {
      const celsius = (val - 32) * (5 / 9); //Formula to convert Fahrenheit to Celsius
      return `${celsius.toFixed(2)} °C`;
    }

    return `${val.toFixed(2)} °${outputType}`;
  }
}
