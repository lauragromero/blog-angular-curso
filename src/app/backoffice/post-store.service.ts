import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Post } from './post.model';
import { PostService } from './post.service';
import { Store } from './store';

@Injectable({
  providedIn: 'root'
})
export class PostStoreService extends Store<Post[]>{

  constructor( private service: PostService) {
    super();
   }
   init(): Promise<Post[]> {
    if (this.get()) {return; }
    return this.service.getAllPost().pipe(
      tap(this.store)
      ).toPromise();
    }


    create$(post: Post): Promise<Post> {
      return this.service.createPost(post).pipe(
      tap(postResult => {
      this.store([postResult]);
              })
          ).toPromise();
      }

    delete$(id): Promise<Post> {
      return this.service.deletePost(id).pipe(
      tap(() => {
      const posts = this.get();
      console.log(posts);
      const newPosts = posts.filter(post => post._id !== id);
      this.store(newPosts);
              })
          ).toPromise();
      }
}
