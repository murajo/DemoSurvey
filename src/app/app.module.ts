import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ClarityModule } from "@clr/angular";

import { AppComponent } from './app.component';
import { SurveyListComponent } from './survey-list/survey-list.component';
import { SurveyAddComponent } from './survey-add/survey-add.component';
import { SurveyAnswerComponent } from './survey-answer/survey-answer.component';
import { AppRoutingModule } from './app-routing.module';
import { NgChartsModule } from 'ng2-charts';

import { ClarityIcons, trashIcon, cloneIcon, noteIcon, vmBugIcon } from '@cds/core/icon';
import { SurveyAnswerListComponent } from './survey-answer-list/survey-answer-list.component';
import { SurveyEditComponent } from './survey-edit/survey-edit.component';

ClarityIcons.addIcons(trashIcon);
ClarityIcons.addIcons(cloneIcon);
ClarityIcons.addIcons(noteIcon);
ClarityIcons.addIcons(vmBugIcon);

@NgModule({
  declarations: [
    AppComponent,
    SurveyListComponent,
    SurveyAddComponent,
    SurveyAnswerComponent,
    SurveyAnswerListComponent,
    SurveyEditComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ClarityModule,
    NgChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
