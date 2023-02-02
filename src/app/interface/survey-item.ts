export interface SurveyItem {
    id: number;
    text: string;
    surveyId: number;
    created: string;
    updated: string;
}

export class SurveyItemInitialize {
    id: number;
    text: string;
    surveyId: number;
    created: string;
    updated: string;

    constructor() {
        this.id = 0;
        this.text = "";
        this.surveyId = 0;
        this.created = "";
        this.updated = "";
    }
}