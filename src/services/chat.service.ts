import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = 'https://seahorse-app-dr62o.ondigitalocean.app/chat';

  constructor(private http: HttpClient) {}

  public sendMessage(userMessage: string): Observable<any> {
    const body = { message: userMessage };
    return this.http.post(this.apiUrl, body);
  }
}
