import {Component, HostListener, OnInit} from '@angular/core';
import {Creator} from "../../Entity/Creator";
import {SubscriberServiceComponent} from "../../../Services/subscriber-service/subscriber-service.component";

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent implements OnInit{
  cards: any[] = [];

  constructor(private subscriberService:SubscriberServiceComponent) {
  }

  ngOnInit(): void {
      this.getHomePageCreators();
  }

  getHomePageCreators():void{
    this.subscriberService.getHomePageCreators().subscribe(data=>this.cards=data)
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

  openSubscriptionPopout(card: any): void {
    card.showPopout = true;
  }

  closeSubscriptionPopout(card: any): void {
    card.showPopout = false;
  }
}
