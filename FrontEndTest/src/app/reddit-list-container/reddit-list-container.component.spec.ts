import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedditListContainerComponent } from './reddit-list-container.component';

describe('RedditListContainerComponent', () => {
  let component: RedditListContainerComponent;
  let fixture: ComponentFixture<RedditListContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RedditListContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RedditListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
