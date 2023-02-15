import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ClrLoadingState } from '@clr/angular';
import { Survey } from '../class/survey';
import { SurveyService } from '../service/survey.service';
import { SurveyItem } from '../class/survey-item';
import { SurveyItemService } from '../service/survey-item.service';
import { combineLatest, forkJoin, Observable, of } from 'rxjs';

@Component({
  selector: 'app-survey-edit',
  templateUrl: './survey-edit.component.html',
  styleUrls: ['./survey-edit.component.css']
})
export class SurveyEditComponent {
  @Output() reloadSurveys = new EventEmitter();
  @Input() survey?: Survey;
  @Input() surveyItems?: SurveyItem[];

  deleteSurveyItems: number[] = [];
  submitBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;

  constructor(
    private surveyService: SurveyService,
    private surveyItemService: SurveyItemService
  ) { }

  onClose(): void {
    this.survey = undefined;
    this.surveyItems = [];
    this.deleteSurveyItems = [];
    this.reloadSurveys.emit();
  }

  editFixSurvey() {
    this.submitBtnState = ClrLoadingState.LOADING;
    const requests = [this.updateSurvey()];
    requests.push(this.updateSurveyItem());
    requests.push(this.deleteSurveyItem());
    requests.push(this.addSurveyItem());

    combineLatest(requests).subscribe(() => {
      this.submitBtnState = ClrLoadingState.SUCCESS;
      this.submitBtnState = ClrLoadingState.DEFAULT;
      this.onClose();
    }, (errors) => {
      this.submitBtnState = ClrLoadingState.ERROR;
      console.error(errors);
    }
    );
  }

  updateSurvey(): Observable<any> {
    return this.survey ? this.surveyService.updateSurvey(this.survey) : of(null);
  }

  addSurveyItem(): Observable<any> {
    if (!this.surveyItems || !this.survey) return of(null);
    const addSurveyItems = this.surveyItems.filter(item => item.id === 0);
    const surveyId = this.survey.id;
    return addSurveyItems.length ? forkJoin(
      addSurveyItems.map(item => this.surveyItemService.addSurveyItem(item, surveyId))
    ) : of(null);
  }

  updateSurveyItem(): Observable<any> {
    if (!this.surveyItems) return of(null);
    const updateSurveyItems = this.surveyItems.filter(item => item.id !== 0);
    return updateSurveyItems.length ? forkJoin(
      updateSurveyItems.map(item => this.surveyItemService.updateSurveyItem(item))
    ) : of(null);
  }

  deleteSurveyItem(): Observable<any> {
    return this.deleteSurveyItems.length ? forkJoin(
      this.deleteSurveyItems.map(deleteSurveyItemId => this.surveyItemService.deleteSurveyItem(deleteSurveyItemId))
    ) : of(null);
  }

  addSurveyItemInitialize() {
    if (!this.surveyItems) return;
    this.surveyItems.push(new SurveyItem);
  }

  deleteSurveyItemList(index: number) {
    if (!this.surveyItems) return;
    this.deleteSurveyItems.push(this.surveyItems[index].id);
    this.surveyItems.splice(index, 1);
  }
}
