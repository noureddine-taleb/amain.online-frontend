import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  registerForm : FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {

    this.registerForm = this.formBuilder.group({
      name: '',
      phone: '',
      dob: '',
      image: '',
      password: '',
      password_confirmation: '',
    });
  }

  submit(data){

    this.userService.register(data).subscribe( (response)=>{
      
      console.log(response);
    },(err)=>{
      
      console.log('status',err['status']);
    });
    console.log(data);
        
  }

}
