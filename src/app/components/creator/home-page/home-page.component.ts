import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ActivatedRoute} from "@angular/router";
import { CreatorServiceComponent } from 'src/app/Services/creator-service.component';

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

  constructor(private router: Router, private route: ActivatedRoute, private creatorService: CreatorServiceComponent) {
    // this.subscribed = JSON.parse(this.router.url.split("=")[1]) || false;
    this.route.queryParams.subscribe(params=>{
      this.subscribed = params['subscribed'] === 'true';
      this.creator = params['creator'];
    })
    this.isCreator = localStorage.getItem('userType') == 'CREATOR';
  }

  ngOnInit(): void {
    //initialize name and image from user data
    let username = localStorage.getItem("username")
    let url = localStorage.getItem("photoURL")
    var firstCharUpper = username != null ? (username.charAt(0).toUpperCase() + username.slice(1)) : "";
    this.name = firstCharUpper
    this.coverImage = url != null ? url : ""
    this.profileImage = url != null ? url : ""
    this.getPosts()
  }

  addCard() {
    const content = this.newCardTitle + " ! " + this.newCardText + " ! " + 'https://i.scdn.co/image/ab67616100005174cf9b3d18027745226f6a5334' + " ! " + this.name
    const newCard = {
      content: content,
      subscriptionTypeId: this.selectedOption
    };
    this.cards.push(newCard);
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
      console.log(data);
      console.log(this.name)
      let posts = [];
      for(let post of data){
        if(post.content.includes(this.name))
          posts.push(post);
      }
      this.cards = posts;
      console.log(this.cards)
    })
  }

  getBackgroundImage(card: any): string {
    const url = card.content.split("!")[2];
    return 'url(' +  url  + ')';
  }
}
