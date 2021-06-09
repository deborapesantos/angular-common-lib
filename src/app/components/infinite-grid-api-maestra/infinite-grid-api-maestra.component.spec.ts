import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfiniteGridApiMaestraComponent } from './infinite-grid-api-maestra.component';

describe('InfiniteGridApiMaestraComponent', () => {
  let component: InfiniteGridApiMaestraComponent;
  let fixture: ComponentFixture<InfiniteGridApiMaestraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfiniteGridApiMaestraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfiniteGridApiMaestraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
