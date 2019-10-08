import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextParsingComponent } from './text-parsing.component';

describe('TextParsingComponent', () => {
  let component: TextParsingComponent;
  let fixture: ComponentFixture<TextParsingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextParsingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextParsingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
