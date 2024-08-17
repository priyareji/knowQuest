import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trimString'
})
export class TrimStringPipe implements PipeTransform {

  transform(value: string, trimLength?: number): string {
    if(!value) return value;
    if(trimLength) {
      return(value.substring(0,trimLength)+'...');
    }
    if(value.length > 14) { return(value.substring(0,14)+'...'); }
    return value;
  }

}
