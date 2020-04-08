import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NekretnineListComponent } from './nekretnine-list.component';

describe('NekretnineListComponent', () => {
  let component: NekretnineListComponent;
  let fixture: ComponentFixture<NekretnineListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NekretnineListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NekretnineListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
