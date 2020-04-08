import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NekretninaDetailComponent } from './nekretnina-detail.component';

describe('NekretninaDetailComponent', () => {
  let component: NekretninaDetailComponent;
  let fixture: ComponentFixture<NekretninaDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NekretninaDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NekretninaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
