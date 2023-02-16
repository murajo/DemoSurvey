import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ClrLoadingState } from '@clr/angular';

import { Survey } from '../class/survey';
import { SurveyItem } from '../class/survey-item';

import { SurveyService } from '../service/survey.service';
import { SurveyItemService } from '../service/survey-item.service';
import { forkJoin, Observable, of } from 'rxjs';

@Component({
  selector: 'app-survey-add',
  templateUrl: './survey-add.component.html',
  styleUrls: ['./survey-add.component.css']
})
export class SurveyAddComponent {
  @Output() reloadSurveys = new EventEmitter();
  @Input() addModalOpen?: Boolean;

  surveyItems: SurveyItem[] = [];
  survey = new Survey;
  deleteSurveyItems: number[] = [];
  submitBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;

  constructor(
    private surveyService: SurveyService,
    private surveyItemService: SurveyItemService
  ) { }

  onClose(): void {
    this.addModalOpen = false;
    this.survey = new Survey;
    this.surveyItems = [];
    this.deleteSurveyItems = [];
    this.reloadSurveys.emit();
  }

  editFixSurvey() {
    this.submitBtnState = ClrLoadingState.LOADING;
    this.addSurvey().subscribe(survey => {
      this.addSurveyItem(survey.id).subscribe(() => {
        this.submitBtnState = ClrLoadingState.SUCCESS;
        this.onClose();
      });
    })
  }

  addSurvey(): Observable<any> {
    return this.survey ? this.surveyService.addSurvey(this.survey) : of(null);
  }

  addSurveyItem(surveyId: number): Observable<any> {
    const addSurveyItems = this.surveyItems.filter(item => item.id === 0);
    return addSurveyItems.length ? forkJoin(
      addSurveyItems.map(item => this.surveyItemService.addSurveyItem(item, surveyId))
    ) : of(null);
  }

  addSurveyItemInitialize() {
    this.surveyItems.push(new SurveyItem);
  }

  deleteSurveyItem(index: number) {
    this.surveyItems.splice(index, 1);
  }
}
