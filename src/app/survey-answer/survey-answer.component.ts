import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { Survey } from '../class/survey';
import { SurveyItem } from '../class/survey-item';
import { Answer } from '../class/answer';
import { ChartTemplate } from '../class/chart';

import { SurveyService } from '../service/survey.service';
import { SurveyItemService } from '../service/survey-item.service';
import { AnswerService } from '../service/answer.service';

import { ChartDataset } from "chart.js";

@Component({
  selector: 'app-survey-answer',
  templateUrl: './survey-answer.component.html',
  styleUrls: ['./survey-answer.component.css']
})
export class SurveyAnswerComponent {

  survey?: Survey;
  surveyItems?: SurveyItem[];
  answers?: Answer[];
  answerChart = new ChartTemplate();
  surveyId = Number(this.route.snapshot.paramMap.get('id'))

  constructor(
    private surveyService: SurveyService,
    private surveyItemService: SurveyItemService,
    private answerService: AnswerService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getSurveyById(this.surveyId).subscribe(survey => { this.survey = survey });
    this.getSurveyItemsBySurveyId(this.surveyId).subscribe(surveyItems => { this.surveyItems = surveyItems });
    this.getAnswerBySurveyId(this.surveyId).subscribe(answers => {
      this.answers = answers;
      this.initChartDataset();
    });
  }

  getSurveyById(surveyId: number): Observable<any> {
    return this.surveyService.getSurveyById(surveyId)
  }

  getSurveyItemsBySurveyId(surveyId: number): Observable<any> {
    return this.surveyItemService.getSurveyItemsBySurveyId(surveyId);
  }

  getAnswerBySurveyId(surveyId: number): Observable<any> {
    return this.answerService.getAnswerBySurveyId(surveyId);
  }

  selectAnswer(surveyItemId: number) {
    const answer = new Answer;
    answer.surveyId = this.surveyId;
    answer.surveyItemId = surveyItemId;
    this.addAnswer(answer).subscribe(() => {
      this.getAnswerBySurveyId(this.surveyId).subscribe(answers => {
        this.answers = answers
        this.updateChartDataset();
      })
    });
  }

  addAnswer(answer: Answer): Observable<any> {
    return this.answerService.addAnswer(answer);
  }

  initChartDataset() {
    if (!this.surveyItems) return;
    this.answerChart.chartType = "pie";
    this.answerChart.chartOptions = { responsive: true };
    this.answerChart.chartLegend = true;
    this.surveyItems.forEach((surveyItem) => {
      this.answerChart.chartLabels.push(surveyItem.text);
    });
    this.updateChartDataset();
  }

  updateChartDataset() {
    if (!this.surveyItems) return;
    const answerCount: number[] = []
    this.surveyItems.forEach((surveyItem) => {
      if (this.answers) {
        answerCount.push(this.answers.filter(answer => answer.surveyItemId === surveyItem.id).length);
      }
    });
    const answerChartData: ChartDataset[] = [{ data: answerCount }];
    this.answerChart.chartDatasets = answerChartData;
  }
}
