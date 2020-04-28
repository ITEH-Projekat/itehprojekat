import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NekretninaPretragaComponent } from './nekretnina-pretraga.component';

describe('NekretninaPretragaComponent', () => {
  let component: NekretninaPretragaComponent;
  let fixture: ComponentFixture<NekretninaPretragaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NekretninaPretragaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NekretninaPretragaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
