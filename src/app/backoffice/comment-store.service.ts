import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Comment, Post } from './post.model';
import { PostService } from './post.service';
import { Store } from './store';

@Injectable({
  providedIn: 'root'
})
export class CommentStoreService extends Store<Post>{

  comment: Comment;
  constructor( private service: PostService) {
    super();
   }

   init(id): Promise<Post> {
    return this.service.getPostById(id).pipe(
      tap(this.store)
      ).toPromise();
   }

   addComment$(id, comment: Comment){
    return this.service.addComment(id, comment).pipe(
      tap((newC) => {
        const post = this.get();
        const c = Object.assign({}, newC);
        const newComent = [...post.comments, c];
        const newPost = {...post, comments: newComent};
        this.store(newPost);
      })
    ).toPromise();
  }

  update$(idComment, comment: Comment): Promise<Comment> {
    return this.service.updateComment(idComment, comment).pipe(
      tap((newComment) => {
      const post = this.get();
      const c = Object.assign({}, newComment);
      const index = this.searchIndex(post.comments, idComment);
      const newComments = [...post.comments.slice(0, index), c, ...post.comments.slice(index + 1 )];
      const newPost = {...post, comments: newComments};
      this.store(newPost);
     })
          ).toPromise();
  }

  delete$(id): Promise<Comment> {
    return this.service.deleteComment(id).pipe(
    tap(() => {
    const post = this.get();
    const postComments = post.comments.filter(commt => commt._id !== id);
    const newPost = {...post, comments: postComments};
    this.store(newPost);
    })
       ).toPromise();
    }

    private searchIndex(comments: Comment[], commentId: string){
      const findComment = comments.findIndex(item => item._id === commentId);
      return findComment;
      }
}
