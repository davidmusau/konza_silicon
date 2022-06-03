import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/authservice/auth.service";
import { Router} from "@angular/router";
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],

})
export class LoginComponent implements OnInit {
  loginForm= new FormGroup({
  email: new FormControl('', [Validators.required, Validators.email]),
  password: new FormControl('', [Validators.required])
});
  submitted = false;

  private formSubmitAttempt: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router:Router
  ) {
  }


  ngOnInit() {
  }

  async userLogin(message?: any) {
    this.loginForm.disabled

    const user: User = {
       email: this.loginForm.value.email || '',
      password: this.loginForm.value.password || ''
    }
   await this.authService.userLogin(user).subscribe( {
  next: () =>{
      this.formSubmitAttempt=true;
      this.submitted = true;
      this.router.navigate(['/dashboard'])
    },
       error: error => {
         alert("Invalid Email and Password")
       }
     }

      )
  }
}
