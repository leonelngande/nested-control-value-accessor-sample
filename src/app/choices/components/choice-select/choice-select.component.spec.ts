import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoiceSelectComponent } from './choice-select.component';

describe('ExamSectionQuestionFormComponent', () => {
  let component: ChoiceSelectComponent;
  let fixture: ComponentFixture<ChoiceSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoiceSelectComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoiceSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
