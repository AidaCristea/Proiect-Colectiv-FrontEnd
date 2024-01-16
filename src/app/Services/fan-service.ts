import {Injectable} from "@angular/core";
import {endpoint} from "./endpoints";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Fan} from "../components/Entity/Fan";

@Injectable({providedIn: 'root'})
export class FanService {
  constructor(private http:HttpClient) {
  }
  public addFan(fan: Fan): Observable<Fan> {
    return this.http.post<any>(`${endpoint.BASE_URL}${endpoint.CREATE_FAN}`, fan);
  }
  public getCreatorsForFan(fanId: number): Observable<any>{
    return this.http.get<any>(`${endpoint.BASE_URL}${endpoint.SUBSCRIBER_GET_CREATORS}` + "/" + fanId)
  }
  public getFans(): Observable<any>{
    return this.http.get<any>(`${endpoint.BASE_URL}` + "/fan")
  }
}
