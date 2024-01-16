import {Component, HostListener} from '@angular/core';
import {Router} from "@angular/router";
import {SubscriberServiceComponent} from "../../../Services/subscriber-service.component";
import { FanService } from 'src/app/Services/fan-service';

@Component({
  selector: 'app-subscriptions-card-list',
  templateUrl: './subscriptions-card-list.component.html',
  styleUrls: ['./subscriptions-card-list.component.scss']
})
export class SubscriptionsCardListComponent {
  cards: any[] = [];

  constructor(private router: Router, private subscriberService:SubscriberServiceComponent, private fanService:FanService) {
  }

  ngOnInit(): void {
    this.getHomePageCreators();
  }

  getHomePageCreators():void{
    let fanId = Number(localStorage.getItem("fanId"))
    this.fanService.getCreatorsForFan(fanId).subscribe(data=>{
      this.cards=data
      console.log(this.cards)
    })
  }

  getBackgroundImage(card: any): string {
    const url = card.photoURL;
    return 'url(' +  url  + ')';
  }

  navigateToCreatorHome(card: any) {
    //not a nice way of doing things but it is what it is
    localStorage.setItem("creator_id", card.creatorId)
    localStorage.setItem("creator_name", card.bio.split("!")[0])
    localStorage.setItem("creator_image", card.photoURL)
    this.router.navigate(['/creator/home'], {queryParams: {subscribe: true}})
  }
}
