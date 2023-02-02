import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyAnswerListComponent } from './survey-answer-list.component';

describe('SurveyAnswerListComponent', () => {
  let component: SurveyAnswerListComponent;
  let fixture: ComponentFixture<SurveyAnswerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurveyAnswerListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SurveyAnswerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
