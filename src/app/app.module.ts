import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatCardModule} from '@angular/material/card';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule } from '@angular/forms';
import { HomePageComponentSubscriber } from './components/subscriber/home-page/home-page.component';
import { HomePageComponentCreator } from './components/creator/home-page/home-page.component';
import { CardListComponent } from './components/subscriber/card-list/card-list.component';
import { MenuComponent } from './components/menu/menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { SubscriptionsPageComponent } from './components/subscriber/subscriptions-page/subscriptions-page.component';
import { SubscriptionsCardListComponent } from './components/subscriber/subscriptions-card-list/subscriptions-card-list.component';
import { ProfileComponent } from './components/creator/profile/profile.component';
import {NgOptimizedImage} from "@angular/common";
import {provideHttpClient} from '@angular/common/http';
import {MatRadioModule} from "@angular/material/radio";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomePageComponentSubscriber,
    HomePageComponentCreator,
    MenuComponent,
    CardListComponent,
    SubscriptionsPageComponent,
    SubscriptionsCardListComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatCardModule,
    NgOptimizedImage,
    MatRadioModule,
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
