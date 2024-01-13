import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {User} from "../Entity/User";
import {AuthServiceComponent} from "../../Services/auth-service/auth-service.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  username: string = ''
  password: string = ''
  invalidCredentials: boolean = false

  constructor(private authService: AuthServiceComponent, private router: Router) {}

  navigateToRegister(): void {
    this.router.navigateByUrl('register');
  }

  login(): void{
    console.log("LOGIN TRY")
    const object = {
      email: this.username,
      password: this.password
    }
    this.authService.login(object).subscribe(
      response => {
        console.log(response)
        const userType = response.userType
          this.router.navigateByUrl(userType === 'FAN' ? 'subscriber/home' : 'creator/home');
         this.authService.handleLoginResponse(response);
         this.invalidCredentials=false;
        },
      error => {
        console.error('Error during login:', error);
        this.invalidCredentials=true;
      }
    );  }

  ngOnInit(): void {
    this.authService.logout();
  }

}
