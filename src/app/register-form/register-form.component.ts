import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  myForm : FormGroup;

  constructor(private formBuilder: FormBuilder ) { }

  ngOnInit(): void {

    this.myForm = this.formBuilder.group({
      name: '',
      phone: '',
      dob: '',
      gender: '',
      image: '',
      password: '',
      password_confirm: '',

    })
  }

}
