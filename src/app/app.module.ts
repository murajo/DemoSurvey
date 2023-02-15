import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SurveyListComponent } from './survey-list/survey-list.component';
import { SurveyAddComponent } from './survey-add/survey-add.component';
import { SurveyAnswerComponent } from './survey-answer/survey-answer.component';
import { SurveyEditComponent } from './survey-edit/survey-edit.component';
import { SurveyDeleteComponent } from './survey-delete/survey-delete.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ClarityModule } from "@clr/angular";
import { NgChartsModule } from 'ng2-charts';
import { ClarityIcons, trashIcon, cloneIcon, noteIcon, vmBugIcon } from '@cds/core/icon';

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
    SurveyEditComponent,
    SurveyDeleteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ClarityModule,
    NgChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
