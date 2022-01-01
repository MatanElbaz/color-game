import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Color } from '../models/color';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  maxVoted: number = 0;

  constructor(private httpClient: HttpClient) { }

  public getAllColors(): Observable<Color[]> {
    return this.httpClient.get<Color[]>("http://localhost:8080/all", { withCredentials: true });
  }

  public addColorVote(id: any): Observable<any> {
    return this.httpClient.put<any>("http://localhost:8080/add-vote/" + id, { responseType: 'text', withCredentials: true });
  }


}
