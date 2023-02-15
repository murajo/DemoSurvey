import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { SurveyItem } from '../class/survey-item';
import { environment } from '../environment/environment';

@Injectable({
    providedIn: 'root'
})

export class SurveyItemService {

    constructor(
        private http: HttpClient,
    ) { }
    private surveyItemApiUrl = environment.apiUrl + "surveyitems";

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    getSurveyItems(): Observable<SurveyItem[]> {
        return this.http.get<SurveyItem[]>(this.surveyItemApiUrl).pipe(
          catchError((error: HttpErrorResponse) => {
            console.error(error);
            return throwError(error);
          })
        );
    }

    getSurveyItemsBySurveyId(surveyId: number): Observable<SurveyItem[]> {
        const url = `${this.surveyItemApiUrl}/${surveyId}`;
        return this.http.get<SurveyItem[]>(url).pipe(
          catchError((error: HttpErrorResponse) => {
            console.error(error);
            return throwError(error);
          })
        );
    }

    addSurveyItem(surveyItem: SurveyItem, surveyId: number): Observable<SurveyItem> {
        surveyItem.surveyId = surveyId;
        return this.http.post<SurveyItem>(this.surveyItemApiUrl, surveyItem, this.httpOptions).pipe(
          catchError((error: HttpErrorResponse) => {
            console.error(error);
            return throwError(error);
          })
        );
    }

    updateSurveyItem(surveyItem: SurveyItem): Observable<SurveyItem> {
        return this.http.put<SurveyItem>(this.surveyItemApiUrl, surveyItem, this.httpOptions).pipe(
          catchError((error: HttpErrorResponse) => {
            console.error(error);
            return throwError(error);
          })
        );
    }

    deleteSurveyItem(id: number): Observable<SurveyItem> {
        const url = `${this.surveyItemApiUrl}/${id}`;
        return this.http.delete<SurveyItem>(url, this.httpOptions).pipe(
          catchError((error: HttpErrorResponse) => {
            console.error(error);
            return throwError(error);
          })
        );
    }
}
