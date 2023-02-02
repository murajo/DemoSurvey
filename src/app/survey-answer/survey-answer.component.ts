import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Survey } from '../interface/survey';
import { ChartTemplate } from '../interface/chart';
import { SurveyService } from '../service/survey.service';
import { SurveyItemService } from '../service/survey-item.service';
import { AnswerService } from '../service/answer.service';
import { SurveyItem } from '../interface/survey-item';
import { Answer, AnswerInitialize } from '../interface/answer';
import { forkJoin, Observable, of } from 'rxjs';
import { ChartDataset } from "chart.js";

@Component({
  selector: 'app-survey-answer',
  templateUrl: './survey-answer.component.html',
  styleUrls: ['./survey-answer.component.css']
})
export class SurveyAnswerComponent {

  survey?: Survey[];
  surveyItems?: SurveyItem[];
  answers?: Answer[];
  answerChart = new ChartTemplate();
  constructor(
    private surveyService: SurveyService,
    private surveyItemService: SurveyItemService,
    private answerService: AnswerService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.getSurveyById(id).subscribe(survey => { this.survey = survey });;
    this.getSurveyItemsBySurveyId(id).subscribe(surveyItems => { this.surveyItems = surveyItems });;
    this.getAnswerBySurveyId(id).subscribe(answers => {
      this.answers = answers
      this.createAnswerChart();
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
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.addAnswer(this.addAnswerInitialize(surveyItemId)).subscribe(() => {
      this.getAnswerBySurveyId(id).subscribe(answers => {
        this.answers = answers
        this.updateChartDataset();
      })
    });
  }

  addAnswer(answer: Answer): Observable<any> {
    return this.survey ?
      this.answerService.addAnswer(answer) : of(null);
  }

  addAnswerInitialize(surveyItemId: number) {
    const answer = new AnswerInitialize;
    answer.surveyId = Number(this.route.snapshot.paramMap.get('id'));
    answer.surveyItemId = surveyItemId;
    return answer;
  }

  createAnswerChart() {
    if (!this.surveyItems) return;
    this.answerChart.chartType = "pie";
    this.answerChart.chartOptions = { responsive: true };
    this.answerChart.chartLegend = true;
    const answerCount: number[] = []
    this.surveyItems.forEach((surveyItem) => {
      this.answerChart.chartLabels.push(surveyItem.text);
      if (this.answers) {
        answerCount.push(this.answers.filter(answer => answer.surveyItemId === surveyItem.id).length);
      }
    });
    const answerChartData: ChartDataset[] = [{ data: answerCount }];
    this.answerChart.chartDatasets = answerChartData;
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
