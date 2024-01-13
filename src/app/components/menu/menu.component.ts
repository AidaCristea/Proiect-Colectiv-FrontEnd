import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit{
  userRole = '';
  ngOnInit(): void {
    const currentUser = localStorage.getItem("currentUser");
    this.userRole = currentUser !== null ? currentUser : "";
  }

  constructor(private router: Router) {}

  toggleMenu() {
    const links = document.querySelector(".j-navbar-links");
    const menu = document.querySelector(".j-hamburger");
    menu?.classList.toggle("active");
    links?.classList.toggle("compact");
  }

  async logout() {
    this.router.navigateByUrl("");
  }

  isCreator(): boolean {
    if(this.userRole == "CREATOR")
      return true;
    return false;
  }
}
