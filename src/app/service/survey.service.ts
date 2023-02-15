import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

import { Survey } from '../class/survey';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})

export class SurveyService {

  constructor(private http: HttpClient) { }
  private surveyApiUrl = environment.apiUrl + "surveys";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getSurveys(): Observable<Survey[]> {
    return this.http.get<Survey[]>(this.surveyApiUrl).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      })
    );
  }

  getSurveyById(surveyId: number): Observable<Survey[]> {
    const url = `${this.surveyApiUrl}/${surveyId}`;
    return this.http.get<Survey[]>(url).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      })
    );
  }

  addSurvey(survey: Survey): Observable<Survey> {
    return this.http.post<Survey>(this.surveyApiUrl, survey, this.httpOptions).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      })
    );
  }

  updateSurvey(survey: Survey): Observable<Survey> {
    return this.http.put<Survey>(this.surveyApiUrl, survey, this.httpOptions).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      })
    );
  }

  deleteSurvey(id: number): Observable<{}> {
    const url = `${this.surveyApiUrl}/${id}`;
    return this.http.delete(url, this.httpOptions).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      })
    );
  }
}
