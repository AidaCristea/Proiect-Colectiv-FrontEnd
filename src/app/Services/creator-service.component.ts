import {Component, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Creator} from "../components/Entity/Creator";
import {endpoint} from "./endpoints";

@Injectable({providedIn: 'root'})
export class CreatorServiceComponent {
  constructor(private http: HttpClient) { }

  addCreator(creator: Creator): Observable<any> {
    return this.http.post(`${endpoint.BASE_URL}${endpoint.ADD_CREATOR}`, creator);
  }
}
