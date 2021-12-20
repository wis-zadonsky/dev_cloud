import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevelopersPageComponent } from './developers-page.component';

describe('DevelopersPageComponent', () => {
  let component: DevelopersPageComponent;
  let fixture: ComponentFixture<DevelopersPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevelopersPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DevelopersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
