import { Component } from '@angular/core';
import { Survey } from '../interface/survey';
import { SurveyService } from '../service/survey.service';
import { SurveyItemService } from '../service/survey-item.service';
import { AnswerService } from '../service/answer.service';
import { SurveyItem } from '../interface/survey-item';
import { Answer } from '../interface/answer';

@Component({
  selector: 'app-survey-answer-list',
  templateUrl: './survey-answer-list.component.html',
  styleUrls: ['./survey-answer-list.component.css']
})
export class SurveyAnswerListComponent {
  answers: Answer[] = [];
  constructor(
    private answerService: AnswerService
  ) { }

  ngOnInit(): void {
    this.getAnswers();
  }

  getAnswers(): void {
    this.answerService.getAnswers()
      .subscribe(answers => {
        this.answers = answers
      });
  }
}
