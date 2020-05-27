import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';
import { of } from 'rxjs/internal/observable/of';
import { PostProxyService } from './post-proxy.service';
import { FAKE_COMMENT, FAKE_ID, FAKE_POST, FAKE_POSTS } from './post-proxy.service.spec';
import { Comment, Post } from './post.model';
import { PostService } from './post.service';


describe('PostService', () => {
  let service: PostService;
  let proxy: PostProxyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(PostService);
    proxy = TestBed.inject(PostProxyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should mapper dto to model on getAllPOST', async(() => {
    const spyProxy = spyOn(proxy, 'getAllPost').and.returnValue(of(FAKE_POSTS));
    service.getAllPost().subscribe(
      (post: Post[]) => {
        expect(post[0]._id).toEqual(FAKE_POSTS[0]._id);
        expect(post[0].username).toEqual(FAKE_POSTS[0].username);
      }
    );
    expect(spyProxy).toHaveBeenCalled();
  }));
  it('should mapper dto to model on GetPOSTbyID', async(() => {
    const spyProxy = spyOn(proxy, 'getPostById').and.returnValue(of(FAKE_POST));
    service.getPostById(FAKE_ID).subscribe(
      (post: Post) => {
        expect(post._id).toEqual(FAKE_POST._id);
        expect(post.username).toEqual(FAKE_POST.username);
      }
    );
    expect(spyProxy).toHaveBeenCalled();
  }));
  it('should mapper dto to model on createPOST', async(() => {
    const spyProxy = spyOn(proxy, 'createPost').and.returnValue(of(FAKE_POST));
    service.createPost(FAKE_POST).subscribe(
      (post: Post) => {
        expect(post._id).toEqual(FAKE_POST._id);
        expect(post.nickname).toEqual(FAKE_POST.nickname);
      }
    );
    expect(spyProxy).toHaveBeenCalled();
  }));
  it('should mapper dto to model on DeletePOST', async(() => {
    const spyProxy = spyOn(proxy, 'deletePost').and.returnValue(of(FAKE_POST));
    service.deletePost(FAKE_ID).subscribe(
      (post: Post) => {
        expect(post._id).toEqual(FAKE_POST._id);
        expect(post.nickname).toEqual(FAKE_POST.nickname);
      }
    );
    expect(spyProxy).toHaveBeenCalled();
  }));
  it('should mapper dto to model on UpdatePOST', async(() => {
    const spyProxy = spyOn(proxy, 'updatePost').and.returnValue(of(FAKE_POST));
    service.updatePost(FAKE_ID, FAKE_POST).subscribe(
      (post: Post) => {
        expect(post._id).toEqual(FAKE_POST._id);
        expect(post.authorId).toEqual(FAKE_POST.authorId);
      }
    );
    expect(spyProxy).toHaveBeenCalled();
  }));
  it('should mapper dto to model on addComment', async(() => {
    const spyProxy = spyOn(proxy, 'addComment').and.returnValue(of(FAKE_COMMENT));
    service.addComment( FAKE_ID, FAKE_COMMENT).subscribe(
      (comment: Comment) => {
        expect(comment._id).toEqual(FAKE_COMMENT._id);
        expect(comment.nickname).toEqual(FAKE_COMMENT.nickname);
      }
    );
    expect(spyProxy).toHaveBeenCalled();
  }));
  it('should mapper dto to model on DeleteComment', async(() => {
    const spyProxy = spyOn(proxy, 'deleteComment').and.returnValue(of(FAKE_COMMENT));
    service.deleteComment( FAKE_ID).subscribe(
      (comment: Comment) => {
        expect(comment._id).toEqual(FAKE_COMMENT._id);
        expect(comment.nickname).toEqual(FAKE_COMMENT.nickname);
      }
    );
    expect(spyProxy).toHaveBeenCalled();
  }));
  it('should mapper dto to model on updateComment', async(() => {
    const spyProxy = spyOn(proxy, 'updateComment').and.returnValue(of(FAKE_COMMENT));
    service.updateComment( FAKE_ID, FAKE_COMMENT).subscribe(
      (comment: Comment) => {
        expect(comment._id).toEqual(FAKE_COMMENT._id);
        expect(comment.nickname).toEqual(FAKE_COMMENT.nickname);
      }
    );
    expect(spyProxy).toHaveBeenCalled();
  }));


});
