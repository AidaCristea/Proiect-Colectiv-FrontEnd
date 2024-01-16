import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ActivatedRoute} from "@angular/router";
import { CreatorServiceComponent } from 'src/app/Services/creator-service.component';
import { SubscriberServiceComponent } from 'src/app/Services/subscriber-service.component';

@Component({
  selector: 'app-home-page-creator',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponentCreator implements OnInit {
  newCardTitle: string = ''; // To store the title
  newCardImage: File | null = null; // To store the selected image file
  newCardText: string = ''; // To store the text content
  name: any = '';
  coverImage = '';
  profileImage = '';
  cards: any = [];
  subscribed: boolean = false;
  isCreator: boolean = false;
  selectedOption: string = '';
  creator: string = '';
  subscriptionType: string = '';

  constructor(private router: Router, private route: ActivatedRoute, private creatorService: CreatorServiceComponent, private subscriberService: SubscriberServiceComponent) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params=>{
      this.subscribed = params['subscribe'] === 'true';
      this.creator = params['creator'];
    })
    console.log(this.subscribed)
    this.isCreator = localStorage.getItem('userType') == 'CREATOR';

    //initialize name and image from user data
    let username = this.isCreator ? localStorage.getItem("username") : localStorage.getItem("creator_name") 
    let url = this.isCreator ? localStorage.getItem("photoURL") : localStorage.getItem("creator_image")
    var firstCharUpper = username != null ? (username.charAt(0).toUpperCase() + username.slice(1)) : "";
    this.name = firstCharUpper
    this.coverImage = url != null ? url : ""
    this.profileImage = url != null ? url : ""
    this.getPosts()
    this.getSubscriptions()
  }

  addCard() {
    const content = this.newCardTitle + " ! " + this.newCardText + " ! " + this.profileImage + " ! " + this.name
    const newCard = {
      content: content,
      subscriptionTypeId: this.selectedOption
    };
    this.cards.unshift(newCard);
    console.log(this.selectedOption)
    this.addPost(newCard);
  }

  addPost(post: any){
    console.log(post);
    this.creatorService.addPost(post).subscribe(
      result => console.log(result)
    );
  }

  getPosts(){
    this.creatorService.getPosts().subscribe(data=>{
      let posts = [];
      //use slice only if there are spaces between text and !
      for(let post of data){
        if(post.content.includes(this.name.slice(0, -1)))
          posts.push(post);
      }
      this.cards = [...posts].reverse();
      console.log(this.cards)
    })
  }

  getSubscriptions(){
    this.subscriberService.getSubscriptions().subscribe(result => {
      const creatorId = localStorage.getItem("creator_id")
      const fanId = localStorage.getItem("fanId")
      let subscriptionType = "LITE"
      for(let subscription of result){
        if(subscription.creatorId == creatorId && subscription.fanId == fanId)
          subscriptionType = subscription.type
      }
      this.subscriptionType = subscriptionType
    })
  }

  getBackgroundImage(card: any): string {
    const url = card.content.split("!")[2];
    return 'url(' +  url  + ')';
  }

  isSubscriptionGood(subscriptionId: number): boolean{
    let subscriptionTypeNumber = 0
    if(this.subscriptionType == "LITE")
      subscriptionTypeNumber = 1
    if(this.subscriptionType == "PRO")
      subscriptionTypeNumber = 2
    if(this.subscriptionType == "ULTIMATE")
      subscriptionTypeNumber = 3
    if(subscriptionTypeNumber >= subscriptionId)
      return true;
    return false;
  }
}
