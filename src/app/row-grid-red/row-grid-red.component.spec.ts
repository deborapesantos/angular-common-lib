import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RowGridRedComponent } from './row-grid-red.component';

describe('RowGridRedComponent', () => {
  let component: RowGridRedComponent;
  let fixture: ComponentFixture<RowGridRedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RowGridRedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RowGridRedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
