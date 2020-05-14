
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { PostDTO } from './home-dto';
import { HomeProxyService } from './home-proxy.service';



@Injectable({
  providedIn: 'root'
})
export class HomeService {
  id: string;
  constructor( private homeProxyService: HomeProxyService) { }

  getAllPost(): Observable<PostDTO[]>{
    return this.homeProxyService.getAllPost();
  }
}
