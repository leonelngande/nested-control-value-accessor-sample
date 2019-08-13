import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoiceFormComponent } from './choice-form.component';

describe('ExamSectionQuestionFormComponent', () => {
  let component: ChoiceFormComponent;
  let fixture: ComponentFixture<ChoiceFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoiceFormComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoiceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
