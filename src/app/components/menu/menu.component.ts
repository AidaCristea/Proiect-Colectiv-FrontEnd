import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  constructor(private router: Router) {}

  toSubscriptions(): void {
    this.router.navigate(['subscriber', 'subscriptions']);
  }

  async logout() {
    this.router.navigateByUrl("");
  }
}
