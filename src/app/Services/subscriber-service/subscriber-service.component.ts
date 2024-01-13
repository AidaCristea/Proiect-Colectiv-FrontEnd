import {Component, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {endpoint} from "../endpoints";
import {Creator} from "../../components/Entity/Creator";
import {SubscriptionType} from "../../components/Entity/SubscriptionTypes";
import {AuthServiceComponent} from "../auth-service/auth-service.component";

@Injectable({providedIn: 'root'})
export class SubscriberServiceComponent {

  constructor(private http:HttpClient, private authService:AuthServiceComponent) {
  }
  getHomePageCreators() {
    console.log(this.authService.currentUserId())
    return this.http.get<Creator[]>(endpoint.BASE_URL+endpoint.SUBSCRIBER_HOME+"/"+this.authService.currentUserId());
  }
  getSubscriptionsTypes(creatorId:number){
    return this.http.get<SubscriptionType[]>(endpoint.BASE_URL+endpoint.SUBSCRIPTION_TYPES+"/"+creatorId);
  }

}
