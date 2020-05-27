import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { PostProxyService } from './post-proxy.service';

describe('PostProxyService', () => {
  let service: PostProxyService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(PostProxyService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it ('should verify get all post request', () => {
    service.getAllPost().subscribe(
      postDTO => expect(postDTO).toBe(FAKE_POSTS)
    );
    const request = httpMock.expectOne('http://localhost:3002/post');
    expect(request.request.method).toEqual('GET');
    request.flush(FAKE_POSTS);
    httpMock.verify();
  });

  it('should verify get post bt Id request', () => {
    service.getPostById(FAKE_ID).subscribe(
      postDTO => expect(postDTO).toBe(FAKE_POST)
    );
    const request = httpMock.expectOne(`http://localhost:3002/post/${FAKE_ID}`);
    expect(request.request.method).toEqual('GET');
    request.flush(FAKE_POST);
    httpMock.verify();
  });

  it('should verify create a post request', () => {
    service.createPost(FAKE_POST).subscribe(
      postDTO => expect(postDTO).toBe(FAKE_POST)
    );
    const request = httpMock.expectOne('http://localhost:3002/post');
    expect(request.request.method).toEqual('POST');
    request.flush(FAKE_POST);
    httpMock.verify();
  });

  it('should verify delete a post request', () => {
    service.deletePost(FAKE_ID).subscribe(
      postDTO => expect(postDTO).toBe(FAKE_POST)
    );
    const request = httpMock.expectOne(`http://localhost:3002/post/${FAKE_ID}`);
    expect(request.request.method).toEqual('DELETE');
    request.flush(FAKE_POST);
    httpMock.verify();
  });

  it('should verify update a post request', () => {
    service.updatePost(FAKE_ID, FAKE_POST).subscribe(
      postDTO => expect(postDTO).toBe(FAKE_POST)
    );
    const request = httpMock.expectOne(`http://localhost:3002/post/${FAKE_ID}`);
    expect(request.request.method).toEqual('PUT');
    request.flush(FAKE_POST);
    httpMock.verify();
  });

  it('should verify add comment request', () => {
    service.addComment(FAKE_ID, FAKE_COMMENT).subscribe(
      commentDTO => expect(commentDTO).toBe(FAKE_COMMENT)
    );
    const request = httpMock.expectOne(`http://localhost:3002/post/${FAKE_ID}/comment`);
    expect(request.request.method).toEqual('PUT');
    request.flush(FAKE_COMMENT);
    httpMock.verify();
  });

  it('should verify delete a comment request', () => {
    service.deleteComment(FAKE_COMMENT._id).subscribe(
      commentDTO => expect(commentDTO).toBe(FAKE_COMMENT)
    );
    const request = httpMock.expectOne(`http://localhost:3002/comment/${FAKE_COMMENT._id}`);
    expect(request.request.method).toEqual('DELETE');
    request.flush(FAKE_COMMENT);
    httpMock.verify();
  });
  it('should verify update a comment request', () => {
    service.updateComment(FAKE_COMMENT._id, FAKE_COMMENT).subscribe(
      commentDTO => expect(commentDTO).toBe(FAKE_COMMENT)
    );
    const request = httpMock.expectOne(`http://localhost:3002/comment/${FAKE_COMMENT._id}`);
    expect(request.request.method).toEqual('PUT');
    request.flush(FAKE_COMMENT);
    httpMock.verify();
  });

});


export const FAKE_POSTS = [{
  _id: '5ea875cbd75089137edf05a3',
username: 'Lola',
nickname: 'Lolita',
authorId: '5ea85d72e489160fda0fdf6c',
title: 'Comentado el tiempo tan inusual que estamos teniendo',
text: 'Hace calorcito por el día pero fresquito por la noche',
date: new Date(),
comments: []
}];

export const FAKE_ID = '5ea875cbd75089137edf05a3';

export const FAKE_POST = {
  _id: '5ea875cbd75089137edf05a3',
username: 'Lola',
nickname: 'Lolita',
authorId: '5ea85d72e489160fda0fdf6c',
title: 'Comentado el tiempo tan inusual que estamos teniendo',
text: 'Hace calorcito por el día pero fresquito por la noche',
date: new Date(),
comments: []

};

export const FAKE_COMMENT = {
  _id: '5ebd27c5649acf0435c5ee3d',
  username: 'ana22',
  nickname: 'pepe',
  comment: 'que alegria!!!!!',
  authPost: '5ea85d72e489160fda0fdf6c',
  date: new Date()

};
