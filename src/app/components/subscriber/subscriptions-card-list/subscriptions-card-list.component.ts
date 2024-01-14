import {Component, HostListener} from '@angular/core';
import {Router} from "@angular/router";
import {SubscriberServiceComponent} from "../../../Services/subscriber-service.component";

@Component({
  selector: 'app-subscriptions-card-list',
  templateUrl: './subscriptions-card-list.component.html',
  styleUrls: ['./subscriptions-card-list.component.scss']
})
export class SubscriptionsCardListComponent {
  cards: any[] = [];

  constructor(private router: Router, private subscriberService:SubscriberServiceComponent) {
  }

  ngOnInit(): void {
    this.getHomePageCreators();
  }

  getHomePageCreators():void{
    this.subscriberService.getSubscribedCreators().subscribe(data=>this.cards=data)
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    const windowHeight = window.innerHeight;
    const scrollY = window.scrollY || window.pageYOffset;
    const documentHeight = document.documentElement.scrollHeight;

    if (windowHeight + scrollY >= documentHeight) {
      //this.generateCards(1);
    }
  }

  navigateToCreatorHome() {
    this.router.navigate(['/creator/home'], {queryParams: {subscribed: true}})
  }
}
