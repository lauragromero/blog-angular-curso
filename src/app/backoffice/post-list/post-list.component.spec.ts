import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { PostProxyService } from '../post-proxy.service';
import { FAKE_ID, FAKE_POST, FAKE_POSTS } from '../post-proxy.service.spec';
import { PostStoreService } from '../post-store.service';
import { PostListComponent } from './post-list.component';


describe('PostListComponent', () => {
  let component: PostListComponent;
  let fixture: ComponentFixture<PostListComponent>;
  let proxy: PostProxyService;
  let store: PostStoreService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [ PostListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostListComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(PostStoreService);
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set store posts', async( () => {
    const spyStore = spyOn (store, 'get$').and.returnValue(of(FAKE_POSTS));
    component.ngOnInit();
    component.allPost$.subscribe(
      post => {
        expect(post[0]._id).toEqual(FAKE_POSTS[0]._id);
      }
    );
    expect(spyStore).toHaveBeenCalled();
  }));

  it('should store delete post', async(() => {
    const spyStore = spyOn (store, 'delete$');
    component.deletePost(FAKE_POST);
    expect(FAKE_POST._id).toEqual(FAKE_ID);
    expect(spyStore).toHaveBeenCalled();
  }
  ));
});
