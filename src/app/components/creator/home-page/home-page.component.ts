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
  name = '';
  coverImage = '';
  profileImage = '';
  cards: any = [];
  subscribed: boolean;
  isCreator: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute, private creatorService: CreatorServiceComponent) {
    this.subscribed = JSON.parse(this.router.url.split("=")[1]) || false;
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
    const newCard = {
      title: this.newCardTitle,
      description: this.newCardText,
      imageUrl: 'https://i.scdn.co/image/ab67616100005174cf9b3d18027745226f6a5334' // Set a default or new image URL
    };
    this.cards.push(newCard);
  }

  getPosts(){
    this.creatorService.getPosts().subscribe(data=>{
      console.log(data)
      this.cards = data
    })
  }
}
