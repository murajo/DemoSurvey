import { Component } from '@angular/core';

import { Survey } from '../class/survey';
import { SurveyItem } from '../class/survey-item';
import { SurveyService } from '../service/survey.service';
import { SurveyItemService } from '../service/survey-item.service';


@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.css']
})
export class SurveyListComponent {
  surveys: Survey[] = [];
  addSurveyModal?: Boolean;
  selectedUpdateSurvey?: Survey;
  selectedDeleteSurvey?: Survey;
  selectedSurveyItems?: SurveyItem[];

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
  }

  endModal() {
    this.addSurveyModal = false;
    this.getSurveys();
  }

  onAddSurvey() {
    this.addSurveyModal = true;
  }

  onEditSurvey(survey: Survey) {
    this.selectedUpdateSurvey = survey;
    this.getSurveyItemsBySurveyId(survey.id);
  }

  getSurveyItemsBySurveyId(surveyId: number) {
    this.surveyItemService.getSurveyItemsBySurveyId(surveyId)
      .subscribe(surveyItems => {
        this.selectedSurveyItems = surveyItems;
      });
  }
  onDeleteSurvey(survey: Survey) {
    this.selectedDeleteSurvey = survey;
  }
}
