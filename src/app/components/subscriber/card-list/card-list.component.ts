import {Component, HostListener, OnInit} from '@angular/core';
import {Creator} from "../../Entity/Creator";
import {SubscriberServiceComponent} from "../../../Services/subscriber-service.component";
import { Router } from '@angular/router';
import {logMessages} from "@angular-devkit/build-angular/src/builders/browser-esbuild/esbuild";

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit{
  cards: any[] = [];
  subscriptions: any[] = [];

  constructor(private router: Router, private subscriberService:SubscriberServiceComponent) {
  }

  ngOnInit(): void {
      this.getHomePageCreators();
      //i know its bad
      const liteSubscription = {
        type: "LITE",
        description: "Stay close to this celebrity and follow his day to day activities.",
        price: 10
      }
      const proSubscription = {
        type: "PRO",
        description: "You get to see more than the average person.",
        price: 20
      }
      const ultimateSubscription = {
        type: "ULTIMATE",
        description: "This one should be purchased only for your idol.",
        price: 30
      }
      this.subscriptions.push(liteSubscription)
      this.subscriptions.push(proSubscription)
      this.subscriptions.push(ultimateSubscription)
  }

  getHomePageCreators():void{
    this.subscriberService.getHomePageCreators().subscribe(data=>{
      this.cards=data
      console.log(data)
    })
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

  navigateToCreatorHome() {
    this.router.navigate(['/creator/home'], {queryParams: {subscribed: false}})
  }

  getBackgroundImage(card: any): string {
    const url = card.photoURL;
    return 'url(' +  url  + ')';
  }
}
