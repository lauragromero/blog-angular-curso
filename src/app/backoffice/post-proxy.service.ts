import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PostDTO } from './post-dto';



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


  createPost(body: object): Observable<PostDTO>{
    return this.httpClient.post<PostDTO>('http://localhost:3002/post', body);
  }

  deletePost(id): Observable<any> {
    console.log(id);
    return this.httpClient.delete(`http://localhost:3002/post/${id}`)
    .pipe(
      catchError(this.errorHandler));
  }



  updatePost(id: number, post: PostDTO): Observable<PostDTO>{
    return this.httpClient.put<PostDTO>(`http://localhost:3002/post/${id}`, {post})
    .pipe(
      catchError(this.errorHandler));
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
