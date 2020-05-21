import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { PostDTO } from './post-dto';
import { PostProxyService } from './post-proxy.service';
import { Post } from './post.model';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor( private proxyPost: PostProxyService) { }

  getAllPost(): Observable<Post[]>{
    return this.proxyPost.getAllPost().pipe(
      map(postsDTO => {
        let posts: Post[] = [];
        postsDTO.map(postDTO => {
        posts = [...posts, this.adaptDTOToModel(postDTO)];
       });
        return posts; })
      );
  }

  getPostById(id: number): Observable<Post> { return this.proxyPost.getPostById(id).pipe(
    map(postDTO => this.adaptDTOToModel(postDTO)) );
  }

  createPost(post: Post): Observable<Post>{
    console.log(post);
    return this.proxyPost.createPost(this.adaptModelTODTO(post)).pipe(
      map((postDTO: PostDTO) => {
        return postDTO;
      })
    );
    // return this.proxyPost.createPost(this.adaptModelTODTO(post)).pipe(
    //   map((postResult: PostDTO) => { return {
    //   postId: postResult._id,
    //   ...post };
    //   }) );
  }

  deletePost(id): Observable<Post> {
    console.log(id);
    return this.proxyPost.deletePost(id).pipe(
    map(postDTO => this.adaptDTOToModel(postDTO)) );
    }

  updatePost(id: number, post: Post): Observable<Post>{
    return this.proxyPost.updatePost(id, this.adaptModelTODTO(post)).pipe(
      map(postDTO => this.adaptDTOToModel(postDTO))
    );
  }


  private adaptDTOToModel(postDTO: PostDTO): Post { return {
    _id: postDTO._id,
    username: postDTO.username,
    nickname: postDTO.nickname,
    title: postDTO.title,
    authorId: postDTO.authorId,
    text: postDTO.text,
    date: postDTO.date,
    comments: postDTO.comments,
    }; }

  private adaptModelTODTO(post: Post): PostDTO {
    return {
      _id: post._id,
      username: post.username,
      nickname: post.nickname,
      title: post.title,
      authorId: post.authorId,
      text: post.text,
      date: post.date,
      comments: post.comments,
    }; }
}
