import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  public phoneRegexp = /^(05|06|07)(\d{2}){4}$/
  public nameRegexp = /^[a-zA-Z ]+$/
  // public imageRegexp = /\.jpe?g$/gi
  public imageRegexp = /image\/*/gi


  constructor() { }


  public matchValidator(matchTo: string ): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => control?.value === control?.parent?.get(matchTo)?.value ? null : { match: true }
  }


  public fileValidator(el: HTMLElement): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const errors: ValidationErrors = {};
      // console.log( (<HTMLInputElement>el)?.files[0], el );
      (el as HTMLInputElement)?.files[0]?.size > 3e6 && (errors.size = true)
      !this.imageRegexp.test( (el as HTMLInputElement)?.files[0]?.type ) && (errors.mime = true)
      return Object.keys(errors).length ? errors : null
    }
  }

}
