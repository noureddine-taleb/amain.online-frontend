import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BillingService } from 'src/app/services/billing.service';

@Component({
  selector: 'app-bill-form',
  templateUrl: './bill-form.component.html',
  styleUrls: ['./bill-form.component.css']
})
export class BillFormComponent implements OnInit {

  //init component props
  billForm: FormGroup;
  names:string[];
  isSubmitted:boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private billing: BillingService
  ) {}


  ngOnInit(): void {
    //get names table from billing service
    this.names = this.billing.names;
    //define form fields
    this.billForm = this.formBuilder.group({
      quantity : ['0',Validators.required],
      name : ['<none>',Validators.required]
    });
  }
 
  // if the user submit the form
  onSubmit(data){
    this.isSubmitted = true;
  }

}
