import {Component, Injectable} from '@angular/core';
import {User} from "../components/Entity/User";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {Router} from "@angular/router";
import {endpoint} from "./endpoints";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Auth} from "../components/Entity/Auth";

@Injectable({providedIn: 'root'})
export class AuthServiceComponent {
  private currentUserSubject: BehaviorSubject<User | null>;

  constructor(private router: Router, private http:HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User | null>(this.getStoredUser());
  }

  public currentUserId(): any {
    return localStorage.getItem("id");
  }
  
  login(body: any): Observable<any>{
    return this.http.post<any>(`${endpoint.BASE_URL}${endpoint.LOGIN}`, body)
  }


  logout(): void {
    localStorage.removeItem('id');
    localStorage.removeItem('userType');
    this.currentUserSubject.next(null);
    this.router.navigateByUrl('login');
  }

  private getStoredUser(): User{
    const storedUser = localStorage.getItem('currentUser');
    return storedUser ? JSON.parse(storedUser) : null;
  }

  public handleSessionStorage(userFromServer: any): void {
    if (userFromServer) {
      console.log(userFromServer)
      localStorage.setItem('id', userFromServer.userId.toString());
      localStorage.setItem('userType', userFromServer.userType.toString());
      localStorage.setItem('username', userFromServer.email.toString());
      localStorage.setItem('photoURL', userFromServer.photoURL.toString());

    } else {
      this.currentUserSubject.next(null);
    }
  }

  registerUser(user: any): Observable<any> {
    return this.http.post<any>(`${endpoint.BASE_URL}${endpoint.SIGNUP}`, user);
  }

}

