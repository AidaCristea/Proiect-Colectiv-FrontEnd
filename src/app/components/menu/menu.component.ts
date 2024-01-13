import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit{
  userRole = '';
  ngOnInit(): void {
    const currentUser = localStorage.getItem("currentUser");
    this.userRole = currentUser !== null ? currentUser : "";
  }

  constructor(private router: Router) {}

  async logout() {
    await new Promise(f => setTimeout(f, 1000));
    this.router.navigateByUrl("")
  }

  isCreator(): boolean {
    if(this.userRole == "CREATOR")
      return true;
    return false;
  }
}
