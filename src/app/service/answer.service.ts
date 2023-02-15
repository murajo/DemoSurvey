import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

import { Answer } from '../class/answer';
import { environment } from '../environment/environment';

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
    return this.http.get<Answer[]>(this.answerApiUrl).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      })
    );
  }

  getAnswerBySurveyId(surveyId: number): Observable<Answer[]> {
    const url = `${this.answerApiUrl}/${surveyId}`;
    return this.http.get<Answer[]>(url).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      })
    );
  }

  addAnswer(answer: Answer): Observable<Answer> {
    return this.http.post<Answer>(this.answerApiUrl, answer, this.httpOptions).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      })
    );
  }

  updateAnswer(answer: Answer): Observable<Answer> {
    return this.http.put<Answer>(this.answerApiUrl, answer, this.httpOptions).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      })
    );
  }

  deleteAnswer(id: number): Observable<Answer> {
    const url = `${this.answerApiUrl}/${id}`;
    return this.http.delete<Answer>(url, this.httpOptions).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      })
    );
  }

}
