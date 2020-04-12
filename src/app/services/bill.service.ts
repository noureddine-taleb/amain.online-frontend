import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  names:string[] = ['abozrar','hmad','taleb'];
  price:number = 7.5;
  fees:number = 10;
  constructor() { }
}
