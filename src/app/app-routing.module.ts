import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SurveyListComponent } from './survey-list/survey-list.component';
import { SurveyAnswerComponent } from './survey-answer/survey-answer.component';

const routes: Routes = [
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  { path: 'list', component: SurveyListComponent },
  { path: 'survey/:id', component: SurveyAnswerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
