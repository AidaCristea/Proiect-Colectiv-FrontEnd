import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = ''
  password: string = ''
  invalidCredentials: boolean = false

  constructor(private router: Router) {}

  navigateToRegister() {
    this.router.navigateByUrl("register")
  }

  login(){
    if(this.username == "randomUser1" && this.password == "pass"){
      this.router.navigateByUrl("subscriber/home")
    } else if (this.username == "smiley" && this.password == "pass"){
      this.router.navigateByUrl("creator/home")
    } else {
      this.invalidCredentials = true
    }
  }
}
