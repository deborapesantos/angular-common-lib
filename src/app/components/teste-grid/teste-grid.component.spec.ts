import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TesteGridComponent } from './teste-grid.component';

describe('TesteGridComponent', () => {
  let component: TesteGridComponent;
  let fixture: ComponentFixture<TesteGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TesteGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TesteGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
