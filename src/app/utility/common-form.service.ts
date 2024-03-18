import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommonFormService {
  formRequiredMessage: string = 'Required';
  invalidFormat: string = 'Invalid Format';
  maxLength : string = 'Maximum length is exceed.'
  constructor() { }
  
  getMaxLength(num : number) {
    return 'Maximum length of ' + num + ' is exceed';
  }
}
