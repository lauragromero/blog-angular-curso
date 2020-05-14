import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { PostDTO } from './home-dto';

@Injectable({
  providedIn: 'root'
})
export class HomeProxyService {
  constructor( private httpClient: HttpClient) { }

  getAllPost(): Observable<PostDTO[]>{
    return this.httpClient.get<PostDTO[]>('http://localhost:3002/post');
  }
}
