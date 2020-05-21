import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CommentDTO, PostDTO } from './post-dto';



@Injectable({
  providedIn: 'root'
})
export class PostProxyService {


  constructor(private httpClient: HttpClient) { }

  getAllPost(): Observable<PostDTO[]>{
    return this.httpClient.get<PostDTO[]>('http://localhost:3002/post');
  }

  getPostById(id): Observable<PostDTO>{
    return this.httpClient.get<PostDTO>('http://localhost:3002/post/' + id);
  }


  createPost(post: PostDTO): Observable<PostDTO>{
    console.log(post);
    return this.httpClient.post<PostDTO>('http://localhost:3002/post', post)
    .pipe(
      catchError(this.errorHandler));
  }

  deletePost(id): Observable<any> {
    console.log(id);
    return this.httpClient.delete(`http://localhost:3002/post/${id}`)
    .pipe(
      catchError(this.errorHandler));
  }

  updatePost(id: number, post: PostDTO): Observable<PostDTO>{
    console.log(post);
    return this.httpClient.put<PostDTO>(`http://localhost:3002/post/${id}`, post)
    .pipe(
      catchError(this.errorHandler));
  }

  addComment(id: number, comment: CommentDTO): Observable<CommentDTO>{
    console.log(comment);
    return this.httpClient.put<CommentDTO>(`http://localhost:3002/post/${id}/comment`, comment);
  }

  deleteComment(idComment: number): Observable<CommentDTO>{
    return this.httpClient.delete<CommentDTO>(`http://localhost:3002/comment/${idComment}`);

  }

  updateComment(idComment: number, comment: CommentDTO): Observable<CommentDTO>{
    return this.httpClient.put<CommentDTO>(`http://localhost:3002/comment/${idComment}`, comment);

  }

  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
       // Get client-side error
       errorMessage = error.error.message;
     } else {
       // Get server-side error
       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
     }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
