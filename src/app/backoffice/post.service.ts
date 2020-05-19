import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostDTO } from './post-dto';
import { PostProxyService } from './post-proxy.service';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor( private proxyPost: PostProxyService) { }

  getAllPost(): Observable<PostDTO[]>{
    return this.proxyPost.getAllPost();
  }

  getPostById(id): Observable<PostDTO>{
    return this.proxyPost.getPostById(id);
  }

  createPost(body: object): Observable<any>{
    return this.proxyPost.createPost(body);
  }
}
