import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteCountingComponent } from './vote-counting.component';

describe('VoteCountingComponent', () => {
  let component: VoteCountingComponent;
  let fixture: ComponentFixture<VoteCountingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoteCountingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoteCountingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
