import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RowGridActionsComponent } from './row-grid-actions.component';

describe('RowGridActionsComponent', () => {
  let component: RowGridActionsComponent;
  let fixture: ComponentFixture<RowGridActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RowGridActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RowGridActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
