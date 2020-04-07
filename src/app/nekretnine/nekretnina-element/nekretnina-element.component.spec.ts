import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NekretninaElementComponent } from './nekretnina-element.component';

describe('NekretninaElementComponent', () => {
  let component: NekretninaElementComponent;
  let fixture: ComponentFixture<NekretninaElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NekretninaElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NekretninaElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
