import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostDTO } from './home-dto';

@Injectable({
  providedIn: 'root'
})
export class DetailProxyService {

  constructor( private httpClient: HttpClient) { }

  getPostById(id): Observable<PostDTO>{

    return this.httpClient.get<PostDTO>('http://localhost:3002/post/' + id);
  }
}
