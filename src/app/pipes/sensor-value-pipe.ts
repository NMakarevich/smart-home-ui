import { Pipe, PipeTransform } from '@angular/core';
import { Value } from '../interfaces/smart-home-response';

@Pipe({
  name: 'sensorValue',
  standalone: true,
})
export class SensorValuePipe implements PipeTransform {
  transform(value: Value): string {
    return `${value.amount} ${value.unit}`;
  }
}
