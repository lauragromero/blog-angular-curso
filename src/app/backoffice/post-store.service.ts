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
      this.store([...this.get(), postResult]);
              })
          ).toPromise();
      }

    update$(postId: string, post: Post): Promise<Post> {
      return this.service.updatePost(postId, post).pipe(
        tap(newPost => {
        const posts = this.get();
        const p = Object.assign({}, newPost);
        const index = this.searchIndex(posts, postId);
        const newPosts = [...posts.slice(0, index), p, ...posts.slice(index, +1)];
        this.store(newPosts); })
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

    private searchIndex(posts: Post[], postId: string){
      return posts.findIndex(item => item._id === postId);
      }
}
