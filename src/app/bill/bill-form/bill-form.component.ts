import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-bill-form',
  templateUrl: './bill-form.component.html',
  styleUrls: ['./bill-form.component.css']
})
export class BillFormComponent implements OnInit {

  billForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ) { 
    this.billForm = this.formBuilder.group({
      quantity : '0',
      price : '0'
    });
  }

  ngOnInit(): void {
  }
 
  onSubmit(data){
    // let total = this.quantity * this.price;
    console.debug(data.quantity * data.price);

  }

}
