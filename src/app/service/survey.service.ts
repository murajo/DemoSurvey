import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Survey } from '../interface/survey';
import { environment } from '../survey-list/environment/environment';

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
    return this.http.get<Survey[]>(this.surveyApiUrl);
  }

  getSurveyById(surveyId: number): Observable<Survey[]> {
    const url = `${this.surveyApiUrl}/${surveyId}`;
    return this.http.get<Survey[]>(url);
  }

  addSurvey(survey: Survey): Observable<Survey> {
    return this.http.post<Survey>(this.surveyApiUrl, survey, this.httpOptions);
  }

  updateSurvey(survey: Survey): Observable<Survey> {
    return this.http.put<Survey>(this.surveyApiUrl, survey, this.httpOptions);
  }

  deleteSurvey(id: number): Observable<{}> {
    const url = `${this.surveyApiUrl}/${id}`;
    return this.http.delete(url, this.httpOptions);
  }
}
