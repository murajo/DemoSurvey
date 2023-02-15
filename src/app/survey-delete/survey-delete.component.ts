import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ClrLoadingState } from '@clr/angular';

import { Survey } from '../class/survey';
import { SurveyItem } from '../class/survey-item';

import { SurveyService } from '../service/survey.service';
import { SurveyItemService } from '../service/survey-item.service';
import { forkJoin, Observable, of } from 'rxjs';

@Component({
  selector: 'app-survey-delete',
  templateUrl: './survey-delete.component.html',
  styleUrls: ['./survey-delete.component.css']
})
export class SurveyDeleteComponent {
  @Output() reloadSurveys = new EventEmitter();
  @Input() survey?: Survey;
  submitBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;

  constructor(
    private surveyService: SurveyService
  ) { }


  onClose(): void {
    this.survey = undefined;
    this.reloadSurveys.emit();
  }

  deleteSurvey(surveyId: number) {
    this.submitBtnState = ClrLoadingState.LOADING;
    this.surveyService.deleteSurvey(surveyId)
      .subscribe(_ => {
        this.submitBtnState = ClrLoadingState.SUCCESS;
        this.submitBtnState = ClrLoadingState.DEFAULT;
        this.onClose();
      });
  }
}
