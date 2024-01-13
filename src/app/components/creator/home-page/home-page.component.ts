import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page-creator',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponentCreator implements OnInit{
  newCardTitle: string = ''; // To store the title
  newCardImage: File | null = null; // To store the selected image file
  newCardText: string = ''; // To store the text content
  name = '';
  coverImage = '';
  profileImage = '';
  cards: any = [];

  constructor(private router: Router){

  }

  ngOnInit(): void {
    //initialize name and image from user data
    this.name = 'Smiley'
    this.coverImage = 'https://i.scdn.co/image/ab67616100005174cf9b3d18027745226f6a5334' // this can stay as it is
    this.profileImage = 'https://i.scdn.co/image/ab67616100005174cf9b3d18027745226f6a5334'
  }

  addCard() {
    const newCard = {
      title: this.newCardTitle,
      description: this.newCardText,
      imageUrl: 'https://i.scdn.co/image/ab67616100005174cf9b3d18027745226f6a5334' // Set a default or new image URL
    };
    this.cards.push(newCard);
  }
}
