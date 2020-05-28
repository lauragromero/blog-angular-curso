import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Comment } from './post.model';
import { PostService } from './post.service';
import { Store } from './store';

@Injectable({
  providedIn: 'root'
})
export class CommentStoreService extends Store<Comment[]>{

  constructor( private service: PostService) {
    super();
   }


  delete$(id): Promise<Comment> {
    return this.service.deleteComment(id).pipe(
    tap(() => {
    const comment = this.get();
    console.log(comment);
    const newPosts = comment.filter(commt => commt._id !== id);
    this.store(newPosts);
    })
       ).toPromise();
    }
}
