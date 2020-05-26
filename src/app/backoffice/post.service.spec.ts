import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs/internal/observable/of';
import { PostProxyService } from './post-proxy.service';
import { FAKE_POSTS } from './post-proxy.service.spec';
import { Post } from './post.model';
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
  it('should mapper dto to model', () => {
    const spyProxy = spyOn(proxy, 'getAllPost').and.returnValue(of(FAKE_POSTS));
    service.getAllPost().subscribe(
      (post: Post[]) => {
        expect(post[0]._id).toEqual(FAKE_POSTS[0]._id);
        expect(post[0].username).toEqual(FAKE_POSTS[0].username);
      }
    );
    expect(spyProxy).toHaveBeenCalled();
  });
  it('should mapper dto to model', () => {
    const spyProxy = spyOn(proxy, 'getPostById').and.returnValue(of(FAKE_POSTS));
    service.getPostById().subscribe(
      (post: Post[]) => {
        expect(post[0]._id).toEqual(FAKE_POSTS[0]._id);
        expect(post[0].username).toEqual(FAKE_POSTS[0].username);
      }
    );
    expect(spyProxy).toHaveBeenCalled();
  });
});
