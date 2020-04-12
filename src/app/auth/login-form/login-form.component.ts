import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  loginForm : FormGroup;
  constructor(private formBuilder: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      phone : '',
      password : ''
    });
  }
      
  submit(data){

    this.userService.login(data).subscribe( (response)=>{
      
      console.log(response);
    },(err)=>{
      
      console.log('status',err['status']);
    });
    console.log(data);
  }

}
