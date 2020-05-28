import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { FAKE_ID, FAKE_POST } from '../post-proxy.service.spec';
import { PostStoreService } from '../post-store.service';
import { CreatePostComponent } from './create-post.component';


describe('CreatePostComponent', () => {
  let component: CreatePostComponent;
  let fixture: ComponentFixture<CreatePostComponent>;
  let store: PostStoreService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,  ReactiveFormsModule, RouterTestingModule],
      declarations: [ CreatePostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePostComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(PostStoreService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set store posts', async( () => {
    const spyStore = spyOn (store, 'create$');
    component.ngOnInit();
    component.createPost();
    expect(FAKE_POST._id).toEqual(FAKE_ID);
    expect(spyStore).toHaveBeenCalled();
  }));

  it('should be two fields username and password', () => {
    expect(component.postForm.contains('username')).toBeTruthy();
    expect(component.postForm.contains('nickname')).toBeTruthy();
});

});
