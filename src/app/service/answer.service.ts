import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Answer } from '../interface/answer';
import { environment } from '../survey-list/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  constructor(
    private http: HttpClient,
  ) { }

  private answerApiUrl = environment.apiUrl + "answers";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getAnswers(): Observable<Answer[]> {
    return this.http.get<Answer[]>(this.answerApiUrl);
  }

  getAnswerBySurveyId(surveyId: number): Observable<Answer[]> {
    const url = `${this.answerApiUrl}/${surveyId}`;
    return this.http.get<Answer[]>(url);
  }

  addAnswer(answer: Answer): Observable<Answer> {
    return this.http.post<Answer>(this.answerApiUrl, answer, this.httpOptions);
  }

  updateAnswer(answer: Answer): Observable<Answer> {
    return this.http.put<Answer>(this.answerApiUrl, answer, this.httpOptions);
  }

  deleteAnswer(id: number): Observable<Answer> {
    const url = `${this.answerApiUrl}/${id}`;
    return this.http.delete<Answer>(url, this.httpOptions);
  }

}
