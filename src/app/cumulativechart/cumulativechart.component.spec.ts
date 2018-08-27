import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CumulativechartComponent } from './cumulativechart.component';

describe('CumulativechartComponent', () => {
  let component: CumulativechartComponent;
  let fixture: ComponentFixture<CumulativechartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CumulativechartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CumulativechartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
