import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiplicatedComponent } from './multiplicated.component';

describe('MultiplicatedComponent', () => {
  let component: MultiplicatedComponent;
  let fixture: ComponentFixture<MultiplicatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiplicatedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiplicatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
