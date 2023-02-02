import { Component } from '@angular/core';
import { Survey } from '../interface/survey';
import { SurveyService } from '../service/survey.service';
import { SurveyItemService } from '../service/survey-item.service';
import { SurveyItem } from '../interface/survey-item';

@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.css']
})
export class SurveyListComponent {
  surveys: Survey[] = [];
  selectedSurveyItems: SurveyItem[] = [];
  selectedSurveyEdit?: Survey;
  addSurveyFlag?: Boolean;
  deleteTargetSurvey?: Survey;
  constructor(
    private surveyService: SurveyService,
    private surveyItemService: SurveyItemService
  ) { }

  ngOnInit() {
    this.getSurveys();
  }

  getSurveys() {
    this.surveyService.getSurveys()
      .subscribe(surveys => this.surveys = surveys);
    this.addSurveyFlag = false;
  }

  getSurveyItemsBySurveyId(surveyId: number) {
    this.surveyItemService.getSurveyItemsBySurveyId(surveyId)
      .subscribe(surveyItems => {
        this.selectedSurveyItems = surveyItems;
      });
  }

  deleteSurvey(surveyId: number) {
    this.surveyService.deleteSurvey(surveyId)
      .subscribe(err => {
        this.getSurveys();
        this.deleteTargetSurvey = undefined;
      });
  }

  onSelect(survey: Survey) {
    this.selectedSurveyEdit = survey;
    this.getSurveyItemsBySurveyId(survey.id);
  }

  onAddSurvey() {
    this.addSurveyFlag = true;
  }

  deleteSurveyAlert(survey: Survey) {
    this.deleteTargetSurvey = survey;
  }

  deleteModalClose() {
    this.deleteTargetSurvey = undefined;
  }

}
