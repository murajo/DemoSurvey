import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SurveyItem } from '../interface/survey-item';
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
        return this.http.get<SurveyItem[]>(this.surveyItemApiUrl);
    }

    getSurveyItemsBySurveyId(surveyId: number): Observable<SurveyItem[]> {
        const url = `${this.surveyItemApiUrl}/${surveyId}`;
        return this.http.get<SurveyItem[]>(url);
    }

    addSurveyItem(surveyItem: SurveyItem, surveyId: number): Observable<SurveyItem> {
        surveyItem.surveyId = surveyId;
        return this.http.post<SurveyItem>(this.surveyItemApiUrl, surveyItem, this.httpOptions);
    }

    updateSurveyItem(surveyItem: SurveyItem): Observable<SurveyItem> {
        return this.http.put<SurveyItem>(this.surveyItemApiUrl, surveyItem, this.httpOptions);
    }

    deleteSurveyItem(id: number): Observable<SurveyItem> {
        const url = `${this.surveyItemApiUrl}/${id}`;
        return this.http.delete<SurveyItem>(url, this.httpOptions);
    }
}
