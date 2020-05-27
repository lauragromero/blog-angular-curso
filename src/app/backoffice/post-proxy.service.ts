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
    return this.httpClient.get<PostDTO[]>('http://localhost:3002/post')
    .pipe(
      catchError(this.errorHandler));
  }

  getPostById(id): Observable<PostDTO>{
    return this.httpClient.get<PostDTO>(`http://localhost:3002/post/${id}`)
    .pipe(
      catchError(this.errorHandler));
  }


  createPost(post: PostDTO): Observable<PostDTO>{
    return this.httpClient.post<PostDTO>('http://localhost:3002/post', post)
    .pipe(
      catchError(this.errorHandler));
  }

  deletePost(id): Observable<any> {
    return this.httpClient.delete(`http://localhost:3002/post/${id}`)
    .pipe(
      catchError(this.errorHandler));
  }

  updatePost(id, post: PostDTO): Observable<PostDTO>{
    return this.httpClient.put<PostDTO>(`http://localhost:3002/post/${id}`, post)
    .pipe(
      catchError(this.errorHandler));
  }

  addComment(id, comment: CommentDTO): Observable<CommentDTO>{
    return this.httpClient.put<CommentDTO>(`http://localhost:3002/post/${id}/comment`, comment);
  }

  deleteComment(idComment): Observable<CommentDTO>{
    return this.httpClient.delete<CommentDTO>(`http://localhost:3002/comment/${idComment}`)
    .pipe(
      catchError(this.errorHandler));

  }

  updateComment(idComment, comment: CommentDTO): Observable<CommentDTO>{
    return this.httpClient.put<CommentDTO>(`http://localhost:3002/comment/${idComment}`, comment)
    .pipe(
      catchError(this.errorHandler));

  }

  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
       errorMessage = error.error.message;
     } else {
       errorMessage = `Error Code: ${error.status} Message: ${error.message}`;
       console.log(error.message);
     }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
