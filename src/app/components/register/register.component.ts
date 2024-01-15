import {Component} from '@angular/core';
import { Router } from '@angular/router';
import {AuthServiceComponent} from "../../Services/auth-service.component";
import {FanService} from "../../Services/fan-service";
import {Fan} from "../Entity/Fan";
import {Creator} from "../Entity/Creator";
import {CreatorServiceComponent} from "../../Services/creator-service.component";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent  {
  isCreator:boolean=false;
  isFan:boolean=true;
  selectedMusicStyles: { [key: string]: boolean } = {};
  musicStyles= ['Rock', 'Pop', 'Hip Hop', 'Electronic', 'Jazz',
    'Classical', 'Country', 'Reggae', 'Indie', 'Metal'
  ];
  passwordMismatch: boolean = false;

  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  photoURL: string='';
  priceLite: number=0;
  pricePro: number=0;
  priceUltimate: number=0;
  bio: string='';

  constructor(private router: Router,private authService:AuthServiceComponent,
              private fanService: FanService,
              private creatorService:CreatorServiceComponent
  ) {}

  navigateToLogin(){
    this.router.navigateByUrl("login")
  }

  register() {
    console.log('isCreator:', this.isCreator);
    this.checkPasswordMatch();

    if (!this.passwordMismatch) {
      let userType = this.isCreator ? "CREATOR" : "FAN";
      const user = this.createUserObject(userType);

      this.authService.registerUser(user).subscribe(
        response => {
          this.authService.handleSessionStorage(response)
          if(this.isCreator){
            const creator = this.createCreatorDto();
            this.addCreator(creator);
          }
         else{
            const fanPreferences = this.getSelectedPreferencesAsString();
            this.composeFan(fanPreferences);
          }
          console.log('User registered successfully:', response);
        },
        error => {
          console.error('Registration failed:', error);
        }
      );
    }
  }

  private createUserObject(userType: string): any {
    return {
      email: this.email,
      password: this.password,
      userType: userType,
      photoURL: this.photoURL
    };
  }

  private getSelectedPreferencesAsString(): string {
    const selectedPreferences = this.musicStyles
      .filter(style => this.selectedMusicStyles[style])
      .join(' ');

    return selectedPreferences;
  }

  private composeFan(preferences: string): void {
    const fan: Fan = {
      fanId: Number(localStorage.getItem("id")),
      preferences: preferences
    };
    this.fanService.addFan(fan).subscribe(
      fanResponse => {
        console.log('Fan added successfully:', fanResponse);
        this.router.navigateByUrl( 'subscriber/home' );

      },
      fanError => {
        console.error('Fan addition failed:', fanError);
      }
    );
  }

  checkPasswordMatch() {
    this.passwordMismatch = this.password !== this.confirmPassword;
  }

  private addCreator(creatorDto: Creator): void {
    this.creatorService.addCreator(creatorDto).subscribe(
      creatorResponse => {
        console.log('Creator added successfully:', creatorResponse);
        this.router.navigateByUrl( 'creator/home?subscribe=true');

      },
      creatorError => {
        console.error('Creator addition failed:', creatorError);
      }
    );
  }

  private createCreatorDto(): Creator {
    return {
      creatorId: Number(localStorage.getItem("id")),
      bio: this.bio, // Assuming you have a 'bio' property in your component
      priceUltimate: this.priceUltimate, // Assuming you have these properties in your component
      priceLite: this.priceLite,
      pricePro: this.pricePro,
      photoURL: this.photoURL,
    };
  }

  protected readonly console = console;


  onIsCreatorChange(b:boolean ) {
    this.isCreator=b;
  }
}
