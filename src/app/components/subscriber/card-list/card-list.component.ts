import {Component, HostListener, OnInit} from '@angular/core';
import {Creator} from "../../Entity/Creator";
import {SubscriberServiceComponent} from "../../../Services/subscriber-service.component";
import { Router } from '@angular/router';
import {logMessages} from "@angular-devkit/build-angular/src/builders/browser-esbuild/esbuild";
import { FanService } from 'src/app/Services/fan-service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit{
  cards: any[] = [];
  subscriptions: any[] = [];
  fanId: number = 0;
  creatorsSubscribedTo: any[] = [];

  constructor(private router: Router, private subscriberService:SubscriberServiceComponent, private fanService: FanService) {
  }

  ngOnInit(): void {
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
      this.fanService.getFans().subscribe(result => {
        for(let fan of result){
          if(fan.preferences.split("!")[0].trim() == localStorage.getItem("username"))
            this.fanId = fan.fanId
        }
        console.log(this.fanId)
        localStorage.setItem("fanId", this.fanId.toString())
        this.getCreatorsSubscribedTo();
      })
  }

  getHomePageCreators():void{
    this.subscriberService.getHomePageCreators().subscribe(data=>{
      // this.cards=data
      // console.log(data)
      let unsubscribedCreators = []
      for(let creator of data){
        if(!this.creatorsSubscribedTo.find(c=>c.creatorId == creator.creatorId))
          unsubscribedCreators.push(creator)
      }
      this.cards = unsubscribedCreators
      console.log(this.cards)
    })
  }

  getCreatorsSubscribedTo():void{
    this.fanService.getCreatorsForFan(this.fanId).subscribe(data=>{
      console.log(data)
      this.creatorsSubscribedTo = data
      this.getHomePageCreators();
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

  navigateToCreatorHome(card: any) {
    const creator = card.bio.split("!")[0]
    this.router.navigate(['/creator/home'], {queryParams: {subscribed: false, creator: creator}})
  }

  getBackgroundImage(card: any): string {
    const url = card.photoURL;
    return 'url(' +  url  + ')';
  }
}
