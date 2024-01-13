import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  constructor(private router: Router) {}

  async logout() {
    await new Promise(f => setTimeout(f, 1000));
    this.router.navigateByUrl("")
  }
}
